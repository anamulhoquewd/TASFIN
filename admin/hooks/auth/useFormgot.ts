import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import api from "@/axios/interceptor";
import { getCookie } from "@/app/actions";

const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const useForgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [value, setValue] = useState("");

  // Form
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    // Start loading
    setIsLoading(true);
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.post(
        `/admins/forgot-password`,
        form.getValues(),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Forgot failed");
      }

      setIsSuccess(true);
      setValue(response.data.data);
      form.reset({
        email: "",
      });
    } catch (error: any) {
      const res = error.response.data;

      if (res.fields) {
        res.fields.forEach((field: { name: string; message: string }) => {
          form.setError(field.name as "email", {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, form, isLoading, isSuccess, value };
};

export default useForgot;

// export type UseForgot = ReturnType<typeof useForgot>;
