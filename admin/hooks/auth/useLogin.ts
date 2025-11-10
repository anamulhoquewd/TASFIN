import { createCookie, getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { handleAxiosError } from "@/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .refine(
      (value) =>
        /^\d{11}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Must be a valid email or 11-digit phone number",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    // Start loading
    setIsLoading(true);
    const token = (await getCookie("accessToken")) as string;
    try {
      // Send login request
      const response = await api.post(
        `/admins/log-in`,
        {
          ...(data.email.includes("@")
            ? { email: data.email }
            : { phone: data.email }),
          password: data.password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Login failed");
      }

      // Redirect to home page
      router.push("/admin");

      // get tokens
      const tokens = response.data.tokens;

      // Set tokens in cookie
      createCookie({
        name: "accessToken",
        value: tokens.accessToken,
        maxAgeAsSeconds: 60 * 15, // 15m
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
