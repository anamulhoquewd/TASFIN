import api from "@/axios/interceptor";
import { IOrder } from "@/interfaces/orders";
import { useCart } from "@/lib/cart-context";
import { CheckoutFormValues, CheckoutSchemaZ } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useCheckout = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { items, clearCart } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutSchemaZ) as any,
    defaultValues: {
      name: "",
      phone: "",
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
        console.log(response.data);

        toast.success(response.data.message || "Order created successfully!");
        console.log(response.data.message || "Order created successfully!");

        // Clear cart and redirect to confirmation
        router.push(`/order-status?orderId=${response.data.data._id}`);
        clearCart();
      }
    } catch (error: any) {
      toast.error("Failed to create order");
      console.error("Error create order:", error);

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
  };
};

export default useCheckout;
