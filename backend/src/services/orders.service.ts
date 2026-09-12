import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import z from "zod";
import { transporter } from "../config/email.js";
import { schemaValidationError } from "./../error/index.js";
import type { IOrder } from "./../interfaces/index.js";
import OrderSequence from "./../models/order-sequence.model.js";
import Order from "./../models/orders.model.js";
import Product from "./../models/products.model.js";
import User from "./../models/users.model.js";
import pagination from "./../utils/pagination.js";
import {
  addressZ,
  idSchemaZ,
  orderFetchQuerySchema,
  type OrderInput,
  orderSchemaZ,
  orderStatusEnumZ,
  type OrderUpdateInput,
  paymentStatusEnumZ,
} from "./../validations/zod.js";
configDotenv();

export interface GetOrderServiceProps {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;
  dateRange?: {
    from: string | Date | undefined;
    to: string | Date | undefined;
  };
  date?: string;
  userId?: string;
  variantId?: string;
  status?:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned"
    | "archived";
  paymentStatus?: "paid" | "unpaid" | "refunded";
  search?: string;
  phone?: string;
  email?: string;
}

/**
 * STATE MACHINE — allowed transitions only.
 * Prevents illegal jumps like delivered -> pending, or cancelling
 * something that's already shipped.
 */
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  pending: ["confirmed", "processing", "cancelled"],
  confirmed: ["processing", "shipped", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "returned"], // "returned" here = delivery refused/failed, not post-delivery return
  delivered: ["returned"], // post-delivery return/exchange window
  cancelled: [], // terminal
  returned: [], // terminal
  archived: [], // terminal; retained for audit, hidden only by an archive filter
};

function assertTransitionAllowed(from: string, to: string) {
  if (!ALLOWED_TRANSITIONS[from]?.includes(to)) {
    return {
      error: {
        message: `Cannot move order from "${from}" to "${to}"`,
      },
    };
  }

  return null;
}

function formatOrderDate(date: Date) {
  const parts = [
    date.getUTCFullYear().toString().padStart(4, "0"),
    (date.getUTCMonth() + 1).toString().padStart(2, "0"),
    date.getUTCDate().toString().padStart(2, "0"),
  ];
  const time = [
    date.getUTCHours().toString().padStart(2, "0"),
    date.getUTCMinutes().toString().padStart(2, "0"),
    date.getUTCSeconds().toString().padStart(2, "0"),
    date.getUTCMilliseconds().toString().padStart(3, "0"),
  ];

  return {
    dateKey: parts.join(""),
    timestamp: `${parts.join("")}-${time.join("")}`,
  };
}

export async function generateOrderNumber(date = new Date()) {
  const { dateKey, timestamp } = formatOrderDate(date);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const sequence = await OrderSequence.findOneAndUpdate(
        { _id: dateKey },
        { $inc: { sequence: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      ).lean();

      if (!sequence) throw new Error("Could not generate order sequence");

      return `TSF-${timestamp}-${sequence.sequence.toString().padStart(4, "0")}`;
    } catch (error: any) {
      if (error?.code !== 11000 || attempt === 2) throw error;
    }
  }

  throw new Error("Could not generate order number");
}

/**
 * Shared restock helper — bumps variant stock back up and recomputes
 * the product's denormalized inStock flag. Used by both cancel and return.
 */
async function restockItems(
  items: {
    product: mongoose.Types.ObjectId;
    variantId: mongoose.Types.ObjectId;
    quantity: number;
  }[],
  session: mongoose.ClientSession,
) {
  for (const item of items) {
    const product = await Product.findById(item.product).session(session);
    if (!product) continue;

    const variant = product.variants.find(
      (value) => value._id.toString() === item.variantId.toString(),
    );
    if (!variant) continue;

    variant.stock += item.quantity;
    await Product.updateOne(
      { _id: item.product, "variants._id": item.variantId } as any,
      {
        $inc: { "variants.$.stock": item.quantity },
        $set: { inStock: product.variants.some((value) => value.stock > 0) },
      },
      { session },
    );
  }
}

/**
 * CANCEL — only allowed while order hasn't shipped yet.
 * Full restock. Refund only if payment was already captured
 * (relevant for bkash/nagad/card, irrelevant for COD-unpaid).
 */
export async function cancelOrder(
  orderId: string,
  reason: string,
  cancelledBy: "user" | "admin",
) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const order = await Order.findById(orderId).session(session);
    if (!order) throw new Error("Order not found");

    order.statusHistory ??= [];

    const transitionError = assertTransitionAllowed(order.status, "cancelled");
    if (transitionError) {
      await session.abortTransaction();
      return transitionError;
    }

    await restockItems(
      order.products.map((i) => ({
        product: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      })),
      session,
    );

    order.status = "cancelled";
    order.statusHistory.push({
      status: "cancelled",
      note: `${cancelledBy}: ${reason}`,
    });

    if (order.paymentStatus === "paid") {
      order.paymentStatus = "refunded";
      // trigger actual refund via payment gateway/manual process here
    }

    await order.save({ session });
    await session.commitTransaction();
    return order;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

/**
 * RETURN — only allowed after delivery. Supports partial returns
 * (customer may return only some items from a multi-item order).
 * Admin-approval gate is intentionally separate from this function —
 * call this only once a return is approved, from your admin panel.
 */
export async function processReturn(
  orderId: string,
  returnedVariantIds: string[], // which variants are being returned
  reason: string,
) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const order = await Order.findById(orderId).session(session);
    if (!order) throw new Error("Order not found");

    order.statusHistory ??= [];

    const transitionError = assertTransitionAllowed(order.status, "returned");
    if (transitionError) {
      await session.abortTransaction();
      return transitionError;
    }

    const returnedItems = order.products.filter((i) =>
      returnedVariantIds.includes(i.variantId.toString()),
    );
    if (returnedItems.length === 0)
      throw new Error("No matching items to return");

    await restockItems(
      returnedItems.map((i) => ({
        product: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      })),
      session,
    );

    const isFullReturn = returnedItems.length === order.products.length;
    order.status = isFullReturn ? "returned" : order.status; // keep status if partial
    order.statusHistory.push({
      status: "returned",
      note: `${isFullReturn ? "Full" : "Partial"} return: ${reason} (${returnedItems.length} item(s))`,
    });

    if (order.paymentStatus === "paid") {
      order.paymentStatus = "refunded"; // for partial returns, calculate partial refund amount separately
    }

    await order.save({ session });
    await session.commitTransaction();
    return order;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

export const register = async (body: OrderInput) => {
  const validData = orderSchemaZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const {
      phone,
      address,
      products,
      name,
      shippingCost,
      email,
      paymentMethod,
    } = validData.data;

    // Step 1: Find or Create User
    let user = await User.findOne({ phone });

    if (!user) {
      const newUser = new User({
        phone,
        ...(email && { email }),
        address,
        name,
      });
      user = await newUser.save();
    }

    // Keep inventory changes and order creation atomic. User creation intentionally
    // stays outside this transaction so the user is retained when the order fails.
    const session = await mongoose.startSession();
    let order;
    try {
      order = await session.withTransaction(async () => {
        const orderProducts: any[] = [];
        let totalAmount = 0;
        let subtotal = 0;
        let discountTotal = 0;

        for (const item of products) {
          const product = await Product.findById(item.productId).session(
            session,
          );
          if (!product) throw new Error("Product not found!");
          if (!product.isActive) throw new Error("Product not Orderable!");

          const variant = product.variants.find(
            (v) => v._id.toString() === item.variantId,
          );
          if (!variant) throw new Error("Variant not found.");

          if (variant.stock < item.quantity) {
            throw new Error(
              `Not enough stock for ${product.title} (${variant.sku}). Available stock ${variant.stock}`,
            );
          }

          const price = variant.price;
          const lineTotal = price * item.quantity;
          subtotal += lineTotal;

          let discountedPrice = price;
          const discount = product.discount;
          const now = new Date();
          const isDiscountActive =
            discount &&
            discount.value > 0 &&
            (!discount.startAt || now >= discount.startAt) &&
            (!discount.endAt || now <= discount.endAt);

          if (isDiscountActive) {
            discountedPrice =
              discount.discountType === "percentage"
                ? Math.round(price * (1 - discount.value / 100))
                : Math.max(0, price - discount.value);
          }

          const discountedLineTotal = discountedPrice * item.quantity;
          discountTotal += lineTotal - discountedLineTotal;
          totalAmount += discountedLineTotal;

          orderProducts.push({
            variantId: variant._id.toString(),
            productId: product._id.toString(),
            title: `${product.title} - ${variant.sku}`,
            image: product.images?.[0],
            price: discountedPrice,
            quantity: item.quantity,
            sku: variant.sku,
          });

          variant.stock -= item.quantity;
          await product.save({ session });
        }

        const [createdOrder] = await Order.create(
          [
            {
              orderNumber: await generateOrderNumber(),
              user: user._id,
              products: orderProducts,
              address,
              shippingCost,
              totalAmount: totalAmount + shippingCost,
              subtotal,
              discountTotal,
              paymentMethod,
              statusHistory: [{ status: "pending", note: "Order created" }],
            },
          ],
          { session },
        );
        return createdOrder;
      });
    } finally {
      await session.endSession();
    }

    // Step 4: Send Email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received",
      text: `Hello Admin,

A new order has been placed on the website. Here are the order details:

Order ID: ${order.orderNumber}
Order ID: ${order._id}
Total Amount: ${order.totalAmount} BDT
Payment Method: ${order.paymentMethod}
Order Date: ${order.createdAt}

Please check the admin dashboard for full order details.

Thank you!
Tasfin Team
`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return {
      success: {
        success: true,
        message: "Order created successfully",
        data: order,
        user,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

// Suppose you receive filters from request query, e.g., /orders?status=pending&minAmount=5000
function buildOrderQuery(filters: {
  status?: string;
  paymentStatus?: string;
  date?: string | Date;
  dateRange?: { from?: string | Date; to?: string | Date };
  userId?: string;
  search?: string;
  variantId?: string;
}) {
  const query: any = {};

  // Search with ID
  if (filters.search) {
    query.$or = [{ orderNumber: { $regex: filters.search, $options: "i" } }];

    if (mongoose.Types.ObjectId.isValid(filters.search)) {
      query.$or.push({
        _id: new mongoose.Types.ObjectId(filters.search),
      });
    }
  }

  // Status filter
  if (filters.status) {
    query.status = filters.status;
  }

  // Payment status filter
  if (filters.paymentStatus) {
    query.paymentStatus = filters.paymentStatus;
  }

  // Date filters: createdAt between fromDate and toDate
  if (filters.dateRange && filters.dateRange.from && filters.dateRange.to) {
    // Length should be 2
    query.createdAt = {};
    if (filters.dateRange.from)
      query.createdAt.$gte = new Date(filters.dateRange.from);
    if (filters.dateRange.to)
      query.createdAt.$lte = new Date(filters.dateRange.to);
    if (Object.keys(query.createdAt).length === 0) delete query.createdAt;
  }

  // Date filter
  if (filters.date) {
    const date = new Date(filters.date);

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    query.createdAt = {
      $gte: date,
      $lt: nextDate,
    };
  }

  // User ID filter
  if (filters.userId) {
    query.user = new mongoose.Types.ObjectId(filters.userId);
  }

  // Filter for a specific variant inside products array
  if (filters.variantId) {
    query["products.variantId"] = new mongoose.Types.ObjectId(
      filters.variantId,
    );
  }

  return query;
}

export const getOrders = async (queryParams: GetOrderServiceProps) => {
  // Safe Parse for better error handling
  const queryValidation = orderFetchQuerySchema.safeParse(queryParams);

  if (!queryValidation.success) {
    return {
      error: schemaValidationError(
        queryValidation.error,
        "Invalid query parameters",
      ),
    };
  }

  try {
    // Resolve phone/email to userId first (since Order.user is an ObjectId ref)
    let resolvedUserId: string | undefined = queryValidation.data.userId;
    if (
      !resolvedUserId &&
      (queryValidation.data.phone || queryValidation.data.email)
    ) {
      const userBy = queryValidation.data.phone
        ? { phone: queryValidation.data.phone }
        : { email: queryValidation.data.email };
      const userDoc = await User.findOne(userBy).select("_id").lean();
      if (!userDoc) {
        // No matching user → no orders
        return {
          success: {
            success: true,
            message: "Orders fetched successfully",
            data: [],
            pagination: pagination({
              page: queryParams.page,
              limit: queryParams.limit,
              total: 0,
            }),
          },
        };
      }
      resolvedUserId = String(userDoc._id);
    }

    // Date filter
    // const dateFilter: any = {};
    // if (
    //   queryValidation.data.dateRange &&
    //   queryValidation.data.dateRange.from &&
    //   queryValidation.data.dateRange.to
    // ) {
    //   dateFilter.$gte = new Date(queryValidation.data.dateRange.from);
    //   dateFilter.$lte = new Date(queryValidation.data.dateRange.to);
    // }

    // Query
    const query = buildOrderQuery({
      status: queryValidation.data.status,
      paymentStatus: queryValidation.data.paymentStatus,
      userId: resolvedUserId,
      variantId: queryValidation.data.variantId,

      search: queryValidation.data.search,

      date: queryValidation.data.date,
      dateRange: queryValidation.data.dateRange,
    });

    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt"].includes(
      queryValidation.data.sortBy,
    )
      ? queryValidation.data.sortBy
      : "createdAt";
    const sortDirection =
      queryValidation.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Get orders
    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .populate("user", "name email phone") // only select name, phone and email from user
        .exec(),

      Order.countDocuments(query),
    ]);

    // Pagination
    const getPagination = pagination({
      page: queryParams.page,
      limit: queryParams.limit,
      total,
    });

    // Response
    return {
      success: {
        success: true,
        message: "Orders fetched successfully",
        data: orders,
        pagination: getPagination,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        error: {
          message: error.message || "Server error",
          code: 500,
        },
      },
    };
  }
};

export const getOrder = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if order exists
    const order = await Order.findById(idValidation.data._id);

    if (!order) {
      return {
        error: {
          message: `Order not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Order fetched successfully!`,
        data: order,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

// TODO./.. Test kora baki ache. order cancelled hole stock back korbe.
export async function updateOrder({
  body,
  _id,
}: {
  body: OrderUpdateInput;
  _id: string;
}) {
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return {
      error: schemaValidationError(idValidation.error, "Invalid ID"),
    };
  }

  const validData = z
    .object({
      address: addressZ,
      paymentStatus: paymentStatusEnumZ,
      status: orderStatusEnumZ,
      note: z.string().trim().max(500).optional(),
    })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    })
    .safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const order = await Order.findById(idValidation.data._id);
    if (!order)
      return {
        error: { message: "Order not found with the provided ID" },
      };

    const { status, paymentStatus, address, note } = validData.data;

    // Rule 1: যদি order.cancelled → আর কিছু update হবে না
    if (order.status === "cancelled" || order.status === "archived") {
      return {
        error: {
          message: "Cancelled or archived order can no longer be updated.",
        },
      };
    }

    // Rule 2: যদি order.delivered → শুধু paymentStatus update হবে
    if (order.status === "delivered") {
      if (paymentStatus) {
        order.paymentStatus = paymentStatus;
        const saved = await order.save();
        return {
          success: {
            success: true,
            message: "Payment status updated successfully for delivered order!",
            data: saved,
          },
        };
      }
      return {
        error: { message: "Delivered order can only update payment status." },
      };
    }

    // Rule 3: যদি cancel করতে চায় → paymentStatus / status change হবে না
    if (status === "cancelled") {
      const cancelled = await cancelOrder(
        idValidation.data._id,
        note || "Order cancelled from admin order update",
        "admin",
      );
      if ("error" in cancelled) return cancelled;
      return {
        success: {
          success: true,
          message: "Order cancelled successfully!",
          data: cancelled,
        },
      };
    }

    // Rule 4: address shipped হলে আর update হবে না
    if (address) {
      if (order.status === "shipped") {
        return {
          error: {
            message: "Address cannot be changed after shipping.",
          },
        };
      }
      // Merge with existing address to preserve required fields (e.g., state) and ensure correct typing
      order.address = {
        ...(order.address || {}),
        ...address,
      } as IOrder["address"];
    }

    // Status changes must follow the order state machine and are audited.
    if (status && (status as string) !== "cancelled") {
      if (status !== order.status) {
        const transitionError = assertTransitionAllowed(order.status, status);
        if (transitionError) return transitionError;
        order.statusHistory.push({
          status,
          ...(note ? { note } : {}),
        });
      }
      order.status = status;
    }

    // paymentStatus update করা যাবে
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    const docs = await order.save();
    return {
      success: {
        success: true,
        message: "Order updated successfully!",
        data: docs,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
}

// DELETE route is intentionally a soft delete so order history remains available.
export const deleteOrder = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const order = await Order.findById(idValidation.data._id);

    if (!order) {
      return {
        error: {
          message: `Order not found with provided ID!`,
        },
      };
    }

    if (order.status === "archived") {
      return {
        error: { message: "Order is already archived." },
      };
    }

    order.statusHistory ??= [];
    order.status = "archived";
    order.statusHistory.push({
      status: "archived",
      note: "Order archived by admin",
    });
    await order.save();

    // Response
    return {
      success: {
        success: true,
        message: "Order archived successfully!",
        data: order,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};
