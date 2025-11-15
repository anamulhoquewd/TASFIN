import { SubscribeFormValues, subscribeFormZ } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useIsMobile } from "./use-mobile";
import api from "@/axios/interceptor";
import { toast } from "sonner";

function useSubscribe() {
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();

  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeFormZ),
    defaultValues: {
      email: "",
    },
  });

  const handleSubscribe = async (value: SubscribeFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/subscribers/register", {
        email: value.email,
        source: isMobile ? "mobile" : "desktop",
      });

      console.log("RES: ", response.data);
      if (response.data.success) {
        // New subscriber
        console.log("🎉 Thanks for subscribing!");
        toast.success("🎉 Thanks for subscribing!");
      }
    } catch (error: any) {
      if (error?.response?.data.fields[0].name) {
        console.log("🎉 You're already subscribed! Thank you!");
        toast.success("🎉 You're already subscribed! Thank you!");
        return;
      }
      console.log("Something went wrong!");
    } finally {
      form.reset({ email: "" });
      setIsLoading(false);
    }
  };

  return { form, isLoading, setIsLoading, handleSubscribe };
}

export default useSubscribe;
