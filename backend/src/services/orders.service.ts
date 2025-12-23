import z from "zod";
import { transporter } from "../config/email.js";
import { Coupon } from "../models/coupon.model.js";
import { CouponUsage } from "../models/couponUsage.model.js";
import { uploadMultipleFiles } from "../utils/cloudinary.js";
import { schemaValidationError } from "./../error/index.js";
import type { IOrder } from "./../interfaces/index.js";
import Order from "./../models/orders.model.js";
import Product from "./../models/products.model.js";
import User from "./../models/users.model.js";
import pagination from "./../utils/pagination.js";
import {
  addressZ,
  mongoIdZ,
  orderFetchQueryZ,
  orderStatusEnumZ,
  orderZ,
  paymentStatusEnumZ,
  type TOrder,
  type TUpdateOrder,
} from "./../validations/zod.js";

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

export const register = async (body: TOrder) => {
  const validData = orderZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const {
      phone,
      address,
      items,
      name,
      shippingCost,
      email,
      paymentMethod,
      customOrder,
      couponCode,
    } = validData.data;

    /* ================= USER ================= */
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        ...(email && { email }),
        address,
        name,
      });
    }

    /* ================= ORDER ITEMS ================= */
    const orderProducts: any[] = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return { error: { message: "Product not found!" } };
      if (!product.status)
        return { error: { message: "Product not orderable!" } };

      const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId
      );

      if (!variant) return { error: { message: "Variant not found!" } };

      if (variant.stock < item.quantity) {
        return {
          error: {
            message: `Not enough stock for ${product.title} (${variant.size} - ${variant?.color}) `,
          },
        };
      }

      const price = variant.price;
      const lineTotal = price * item.quantity;
      totalAmount += lineTotal;

      orderProducts.push({
        productId: product._id,
        variantId: variant._id,
        title: `${product.title} - ${variant.size}`,
        image: product.images?.[0],
        price,
        quantity: item.quantity,
      });

      variant.stock -= item.quantity;
      await product.save();
    }

    /* ================= CALCULATE COUPON DISCOUNT ================= */
    let appliedCoupon = null;
    let couponDiscount = 0;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        status: true,
        startAt: { $lte: new Date() },
        endAt: { $gte: new Date() },
      });

      if (!coupon) return { error: { message: "Invalid coupon code" } };

      if (totalAmount < coupon.minSubtotal) {
        return { error: { message: "Minimum order amount not reached" } };
      }

      if (coupon.usedCount >= coupon.totalUsageLimit) {
        return { error: { message: "Coupon usage limit exceeded" } };
      }

      const usage = await CouponUsage.findOne({
        couponId: coupon._id,
        phone,
      });

      if (usage && usage.usedCount >= coupon.perUserUsageLimit) {
        return { error: { message: "Coupon already used by this user" } };
      }

      // Discount calculate
      if (coupon.discountType === "percent") {
        couponDiscount = (totalAmount * coupon.value) / 100;
      } else {
        couponDiscount = coupon.value;
      }

      couponDiscount = Math.min(couponDiscount, coupon.maxValue);

      appliedCoupon = coupon;
    }

    if (appliedCoupon) {
      // Increment coupon global usage
      await Coupon.findByIdAndUpdate(appliedCoupon._id, {
        $inc: { usedCount: 1 },
      });

      // Per user usage tracking
      const existingUsage = await CouponUsage.findOne({
        couponId: appliedCoupon._id,
        phone,
      });

      if (existingUsage) {
        existingUsage.usedCount += 1;
        existingUsage.lastUsedAt = new Date();
        await existingUsage.save();
      } else {
        await CouponUsage.create({
          couponId: appliedCoupon._id,
          phone,
          usedCount: 1,
          lastUsedAt: new Date(),
        });
      }
    }

    const finalAmount = totalAmount - couponDiscount + shippingCost;

    /* ================= CUSTOM ORDER (UPLOAD IMAGES) ================= */
    let customOrderData: any = { isCustom: false };

    if (customOrder.isCustom) {
      let uploadedRefImages: {
        url: string;
        publicId: string;
        position: number;
      }[] = [];

      if (customOrder.referenceImages?.length) {
        const files = customOrder.referenceImages.map((img) => img.file);

        const uploadResponse = await uploadMultipleFiles(
          customOrder.referenceImages,
          "tasfin_custom_orders"
        );

        if (uploadResponse.error) throw new Error(uploadResponse.error.message);
        if (uploadResponse.serverError)
          throw new Error(uploadResponse.serverError.message);
        if (!uploadResponse.success)
          throw new Error("Reference image upload failed");

        uploadedRefImages = uploadResponse.success.data;
      }

      customOrderData = {
        isCustom: true,
        measurements: customOrder.measurements,
        referenceImages: uploadedRefImages,
        note: customOrder.note,
      };
    }

    /* ================= CREATE ORDER ================= */
    const order = await Order.create({
      name,
      user: user._id,
      items: orderProducts,
      address,
      paymentMethod,
      shippingCost,
      subtotal: totalAmount,
      discount: couponDiscount,
      total: finalAmount,
      customOrder: customOrderData,
      orderDate: new Date(),

      ...(appliedCoupon && {
        coupon: {
          code: appliedCoupon.code,
          discountType: appliedCoupon.discountType,
          value: appliedCoupon.value,
          discountAmount: couponDiscount,
        },
      }),
    });

    /* ================= NOTIFY ADMIN ================= */
    let orderMessage = `Hello Admin,

    A new order has been placed on the website. Here are the order details:

    Order ID: ${order._id}
    Total Amount: ${order.total} BDT
    Payment Method: ${order.paymentMethod}
    Order Date: ${order.orderDate}
    `;

    if (customOrder.isCustom) {
      orderMessage += `\nThis is a CUSTOM order. Please review the custom requirements carefully.`;
    }

    orderMessage += `\n\nPlease check the admin dashboard for full order details.\n\nThank you!\nTasfin Team`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received",
      text: orderMessage,
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

  // Filter for a specific variant inside items array
  if (filters.variantId) {
    query["items.variantId"] = filters.variantId;
  }

  return query;
}

export const getOrders = async (queryParams: GetOrderServiceProps) => {
  // Safe Parse for better error handling
  const queryValidation = orderFetchQueryZ.safeParse(queryParams);

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
  const idValidation = mongoIdZ.safeParse({ _id });
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
  body: TUpdateOrder;
  _id: string;
}) {
  const idValidation = mongoIdZ.safeParse({ _id });
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
    const order = await Order.findById(idValidation.data._id);
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
        for (const item of order.items) {
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
  const idValidation = mongoIdZ.safeParse({ _id: _id });
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
