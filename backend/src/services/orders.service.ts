import { schemaValidationError } from "@/error";
import { IOrder } from "@/interfaces";
import Order from "@/models/orders.model";
import Product from "@/models/products.model";
import User from "@/models/users.model";
import pagination from "@/utils/pagination";
import {
  addressZ,
  idSchemaZ,
  orderFetchQuerySchema,
  OrderInput,
  orderSchemaZ,
  orderStatusEnumZ,
  OrderUpdateInput,
  paymentStatusEnumZ,
} from "@/validations/zod";
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
}

export const register = async (body: OrderInput) => {
  const validData = orderSchemaZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const { phone, address, products, name, shippingCost } = validData.data;

    // 🔹 Step 1: Find or Create User
    let user = await User.findOne({ phone });

    if (!user) {
      const newUser = new User({
        phone,
        address,
        name,
      });
      user = await newUser.save();
    }

    // 🔹 Step 2: Validate Products & Calculate total
    const orderProducts: any[] = [];
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return { error: { message: "Product not found!" } };
      }

      const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId
      );
      if (!variant) {
        return { error: { message: "Variant not found." } };
      }

      if (variant.stock < item.quantity) {
        return {
          error: {
            message: `Not enough stock for ${product.title} (${variant.size}, ${variant.color}). Available stock ${variant.stock}`,
          },
        };
      }

      const price = variant.price;
      const lineTotal = price * item.quantity;
      totalAmount += lineTotal;

      orderProducts.push({
        variantId: variant._id.toString(),
        productId: product._id.toString(),
        title: `${product.title} - ${variant.color} - ${variant.size}`,
        image: variant.images?.[0] || product.images?.[0],
        price,
        quantity: item.quantity,
      });

      variant.stock -= item.quantity;
      await product.save();
    }

    // 🔹 Step 3: Create Order
    const order = await Order.create({
      user: user._id,
      orderDate: new Date(),
      products: orderProducts,
      address,
      paymentStatus: "unpaid",
      shippingCost,
      totalAmount: totalAmount + shippingCost,
      status: "pending",
    });

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

      userId: queryValidation.data.userId,
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

// TODO@ Test kora baki ache. order cancelled hole stock back korbe.
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

// TODO@ Test kora baki ache.
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
