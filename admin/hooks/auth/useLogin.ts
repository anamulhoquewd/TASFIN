import { createCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { loginFormSchema, LoginFormValuse } from "@/lib/schemas";
import { handleAxiosError } from "@/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValuse>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    // Start loading
    setIsLoading(true);

    try {
      // Send login request
      const response = await api.post(`/admins/log-in`, {
        ...(data.email.includes("@")
          ? { email: data.email }
          : { phone: data.email }),
        password: data.password,
      });

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Login failed");
      }

      // get tokens
      const tokens = response.data.tokens;

      // Set tokens in cookie
      createCookie({
        name: "accessToken",
        value: tokens.accessToken,
        maxAgeAsSeconds: 60 * 60, // 60m
      });
      createCookie({
        name: "refreshToken",
        value: tokens.refreshToken,
        maxAgeAsSeconds: 60 * 60 * 24 * 30, // 30d
      });

      // Clear form
      form.reset({
        email: "",
        password: "",
      });

      // Redirect to home page
      toast(response.data?.success?.message || "Login successful!");
      router.push("/admin");
    } catch (error: any) {
      // Handle error
      handleAxiosError(error);

      // Set form errors
      if (error.response && error.response.data) {
        const res = error.response.data;

        if (res.fields) {
          // Set form errors
          res.fields.forEach((field: { name: string; message: string }) => {
            form.setError(field.name as "email" | "password", {
              message: field.message,
            });
          });
        }
      }
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
};

export default useLogin;
