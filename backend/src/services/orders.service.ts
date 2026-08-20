import { transporter } from "../config/email.js";
import { schemaValidationError } from "./../error/index.js";
import type { IOrder } from "./../interfaces/index.js";
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
import z from "zod";

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
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus?: "paid" | "unpaid";
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
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered", "returned"], // "returned" here = delivery refused/failed, not post-delivery return
  delivered: ["returned"], // post-delivery return/exchange window
  cancelled: [], // terminal
  returned: [], // terminal
};

function assertTransitionAllowed(from: string, to: string) {
  if (!ALLOWED_TRANSITIONS[from]?.includes(to)) {
    throw new Error(`Cannot move order from "${from}" to "${to}"`);
  }
}

/**
 * Shared restock helper — bumps variant stock back up and recomputes
 * the product's denormalized inStock flag. Used by both cancel and return.
 */
async function restockItems(
  items: { product: mongoose.Types.ObjectId; variantId: mongoose.Types.ObjectId; quantity: number }[],
  session: mongoose.ClientSession
) {
  for (const item of items) {
    const updated = await Product.findOneAndUpdate(
      { _id: item.product, "variants._id": item.variantId },
      { $inc: { "variants.$.stock": item.quantity } },
      { session, new: true }
    );
    if (updated) {
      updated.inStock = updated.variants.some((v) => v.stock > 0);
      await updated.save({ session });
    }
  }
}

/**
 * CANCEL — only allowed while order hasn't shipped yet.
 * Full restock. Refund only if payment was already captured
 * (relevant for bkash/nagad/card, irrelevant for COD-unpaid).
 */
export async function cancelOrder(orderId: string, reason: string, cancelledBy: "user" | "admin") {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const order = await Order.findById(orderId).session(session);
    if (!order) throw new Error("Order not found");

    assertTransitionAllowed(order.status, "cancelled");

    await restockItems(
      order.items.map((i) => ({ product: i.product, variantId: i.variantId, quantity: i.quantity })),
      session
    );

    order.status = "cancelled";
    order.statusHistory.push({ status: "cancelled", note: `${cancelledBy}: ${reason}` });

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
  reason: string
) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const order = await Order.findById(orderId).session(session);
    if (!order) throw new Error("Order not found");

    assertTransitionAllowed(order.status, "returned");

    const returnedItems = order.items.filter((i) =>
      returnedVariantIds.includes(i.variantId.toString())
    );
    if (returnedItems.length === 0) throw new Error("No matching items to return");

    await restockItems(
      returnedItems.map((i) => ({ product: i.product, variantId: i.variantId, quantity: i.quantity })),
      session
    );

    const isFullReturn = returnedItems.length === order.items.length;
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
    const { phone, address, products, name, shippingCost, email } =
      validData.data;

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

    // Step 2: Validate Products & Calculate total
    const orderProducts: any[] = [];
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return { error: { message: "Product not found!" } };
      }
      if (!product.isActive) {
        return { error: { message: "Product not Orderable!" } };
      }

      const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId,
      );
      if (!variant) {
        return { error: { message: "Variant not found." } };
      }

      if (variant.stock < item.quantity) {
        return {
          error: {
            message: `Not enough stock for ${product.title} (${variant.size}). Available stock ${variant.stock}`,
          },
        };
      }

      const price = variant.price;
      const lineTotal = price * item.quantity;
      totalAmount += lineTotal;

      orderProducts.push({
        variantId: variant._id.toString(),
        productId: product._id.toString(),
        title: `${product.title} - ${variant.size}`,
        image: product.images?.[0],
        price,
        quantity: item.quantity,
      });

      variant.stock -= item.quantity;
      await product.save();
    }

    // Step 3: Create Order
    const order = await Order.create({
      user: user._id,
      orderDate: new Date(),
      products: orderProducts,
      address,
      shippingCost,
      totalAmount: totalAmount + shippingCost,
    });

    // Step 4: Send Email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received",
      text: `Hello Admin,

A new order has been placed on the website. Here are the order details:

Order ID: ${order._id}
Total Amount: ${order.totalAmount} BDT
Payment Method: ${order.paymentMethod}
Order Date: ${order.orderDate}

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
    query._id = filters.search;
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
    query.orderDate = {};
    if (filters.dateRange.from)
      query.orderDate.$gte = new Date(filters.dateRange.from);
    if (filters.dateRange.to)
      query.orderDate.$lte = new Date(filters.dateRange.to);
    if (Object.keys(query.orderDate).length === 0) delete query.orderDate;
  }

  // Date filter
  if (filters.date) {
    const date = new Date(filters.date);

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    query.orderDate = {
      $gte: date,
      $lt: nextDate,
    };
  }

  // User ID filter
  if (filters.userId) {
    query.user = filters.userId;
  }

  // Filter for a specific variant inside products array
  if (filters.variantId) {
    query["products.variantId"] = filters.variantId;
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
        "Invalid query parameters"
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
    const dateFilter: any = {};
    if (
      queryValidation.data.dateRange &&
      queryValidation.data.dateRange.from &&
      queryValidation.data.dateRange.to
    ) {
      dateFilter.$gte = new Date(queryValidation.data.dateRange.from);
      dateFilter.$lte = new Date(queryValidation.data.dateRange.to);
    }

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
      queryValidation.data.sortBy
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
        .populate("user", "name email phone") // only select name and email from user
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
    const order: IOrder | null = await Order.findById(idValidation.data._id);
    if (!order)
      return {
        error: { message: "Order not found with the provided ID" },
      };

    const { status, paymentStatus, address } = validData.data;

    // 🧠 Rule 1: যদি order.cancelled → আর কিছু update হবে না
    if (order.status === "cancelled") {
      return {
        error: { message: "Cancelled order can no longer be updated." },
      };
    }

    // 🧠 Rule 2: যদি order.delivered → শুধু paymentStatus update হবে
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

    // 🧠 Rule 3: যদি cancel করতে চায় → paymentStatus / status change হবে না
    if (status === "cancelled") {
      // Stock restore logic
      if ((order.status as string) !== "cancelled") {
        for (const item of order.products) {
          const product = await Product.findById(item.productId);
          if (product) {
            const variant = product.variants.find(
              (v) => v._id.toString() === item.variantId
            );
            if (variant) {
              variant.stock += item.quantity;
              await product.save();
            }
          }
        }
      }
      order.status = "cancelled";
      const saved = await order.save();
      return {
        success: {
          success: true,
          message: "Order cancelled successfully!",
          data: saved,
        },
      };
    }

    // 🧠 Rule 4: address shipped হলে আর update হবে না
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

    // 🧠 status update করা যাবে (cancel বাদে)
    if (status && (status as string) !== "cancelled") {
      order.status = status;
    }

    // 🧠 paymentStatus update করা যাবে
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

// TODO./.. Test kora baki ache.
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

    // Delete order
    await order.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `User deleted successfully!`,
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
