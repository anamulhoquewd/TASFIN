import api from "@/axios/interceptor";
import { IOrder } from "@/interfaces/orders";
import { useCart } from "@/lib/cart-context";
import { CheckoutFormValues, CheckoutSchemaZ } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useOrders = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [status, setStatus] = useState<"success" | "faild" | null>("success");
  const { items, clearCart } = useCart();
  const [order, setOrder] = useState<{ message: string; data: IOrder } | null>(
    null
  );

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutSchemaZ) as any,
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Bangladesh",
      },
      paymentMethod: "cod",
    },
  });

  const handleSubmit = useCallback(async (values: CheckoutFormValues) => {
    setIsProcessing(true);
    try {
      const data = {
        name: values.name,
        address: values.address,
        phone: values.phone,
        products: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        shippingCost: 0,
      };

      const response = await api.post("/orders/register", data);

      if (response.data.success) {
        toast.success(response.data.message || "Order created successfully!");
        console.log(response.data.message || "Order created successfully!");

        // Clear cart and redirect to confirmation
        setOrder(response.data);
        setStatus("success");
        clearCart();
      }
    } catch (error: any) {
      toast.error("Failed to create order");
      console.error("Error create order:", error);
      setStatus("faild");
      setOrder(null);

      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // fetch orders by user phone or email
  const getOrdersByPhoneOrEmail = useCallback(async (input: string) => {
    try {
      const response = await api.get(`/orders`, {
        params: {
          ...(input.includes("@") ? { email: input } : { phone: input }),
          limit: 100,
        },
      });
      if (response.data.success) {
        return response.data;
      }

      return null;
    } catch (error) {
      toast.error("Failed to fetch orders by phone or email");
      console.error("Failed to fetch orders by phone or email:", error);
      return null;
    }
  }, []);

  // fetch single order by ID
  const getOrderById = useCallback(
    async (id: string): Promise<IOrder | null> => {
      // Prevent duplicate requests
      try {
        const response = await api.get(`/orders/${id}`);
        console.log("Response: ", response);
        if (response.data.success) {
          return response.data.data;
        }
        return null;
      } catch (error) {
        toast.error("Failed to fetch order by ID");
        console.error("Failed to fetch order by ID:", error);
        return null;
      }
    },
    []
  );

  return {
    form,
    handleSubmit,
    isProcessing,
    getOrderById,
    setIsProcessing,
    getOrdersByPhoneOrEmail,
    status,
    order,
    setStatus,
  };
};

export default useOrders;
