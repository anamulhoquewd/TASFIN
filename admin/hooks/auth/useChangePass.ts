import { getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import {
  changePasswordFormSchema,
  ChangePasswordFormValues,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const useChangePass = (onClose: () => void) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordFormSchema>) => {
    setIsLoading(true);
    const token = (await getCookie("accessToken")) as string;

    try {
      const response = await api.patch("/admins/change-password", data, {});

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(
        response.data.success.message || "Password change successfully!"
      );
      onClose();
    } catch (error: any) {
      console.error("Error while changing password", error);

      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    form,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
  };
};

export default useChangePass;
