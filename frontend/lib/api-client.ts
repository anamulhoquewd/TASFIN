import { IProduct } from "@/interfaces/products";
import apiClient from "./api";
import { IOrder } from "@/interfaces/orders";
import { IUser } from "@/interfaces/users";
import { IPagination } from "@/interfaces/global";

interface IProductResponse {
  data: IProduct[];
  pagination: IPagination;
  success: boolean;
  message: string;
}

// Products API
export const productsApi = {
  getProducts: async (
    page = 1,
    limit = 10, // ✅ 2ta kore load korbe
    filters?: Record<string, string>
  ) => {
    const params = { page, limit, ...filters };
    console.log("🌐 API Call:", params);

    const response = await apiClient.get<IProductResponse>("/products", {
      params,
    });

    console.log("✅ API Response:", {
      page,
      items: response.data.data.length,
      hasNext: response.data.pagination?.nextPage,
    });

    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await apiClient.get<IProduct>(`/products/${id}`);
    return response.data;
  },
};

// Custom Orders API
export const customOrdersApi = {
  submitCustomOrder: async (data: FormData) => {
    const response = await apiClient.post("/custom-orders", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

// User API
export const userApi = {
  getUserProfile: async (phone: string) => {
    const response = await apiClient.get<IUser>(`/user?phone=${phone}`);
    return response.data;
  },

  updateUserProfile: async (phone: string, data: Partial<IUser>) => {
    const response = await apiClient.put(`/user/${phone}`, data);
    return response.data;
  },

  updateProfileImage: async (phone: string, formData: FormData) => {
    const response = await apiClient.put(
      `/user/${phone}/profile-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  deleteAccount: async (phone: string) => {
    const response = await apiClient.delete(`/user/${phone}`);
    return response.data;
  },

  getUserOrders: async (phone: string, page = 1) => {
    const response = await apiClient.get<IOrder>(
      `/user/${phone}/orders?page=${page}`
    );
    return response.data;
  },

  getUserAddresses: async (phone: string) => {
    const response = await apiClient.get(`/user/${phone}/addresses`);
    return response.data;
  },
};
