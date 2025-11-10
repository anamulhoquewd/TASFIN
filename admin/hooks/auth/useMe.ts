import { deleteCookie, getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { IAdmin } from "@/interfaces/users";
import { userFormSchemaZ } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function useMe() {
  const [user, setUser] = useState<IAdmin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordOpen, setpasswordOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof userFormSchemaZ>>({
    resolver: zodResolver(userFormSchemaZ),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  });

  const loadMe = async () => {
    const token = (await getCookie("accessToken")) as string;

    try {
      const response = await api.get("/admins/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setUser(response.data.data);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  const handleUpdate = async (data: z.infer<typeof userFormSchemaZ>) => {
    console.log("Update data: ", data);
    setIsLoading(true);
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.patch("/admins/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      loadMe();
      setIsEditing(false);

      toast(response.data.message || "Admin info updated successfully!");
    } catch (error: any) {
      console.log("Error: ", error);

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

  const handleLogout = async () => {
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.post("/admins/log-out", "", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        toast("Logout faild!");
        throw new Error(response.data.error.message);
      }
      deleteCookie({ name: "accessToken" });
      deleteCookie({ name: "refreshToken" });

      // rediract to login page
      router.push("/auth/sign-in");

      toast(response.data.message);
    } catch (error: any) {
      console.log("Error: ", error);

      if (error.response.data.error.message)
        toast(error.response.data.error.message);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        nid: user.nid,
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
        },
      });
    }
  }, [user, form]);

  return {
    user,
    handleUpdate,
    form,
    isLoading,
    setIsLoading,
    passwordOpen,
    setpasswordOpen,
    isEditing,
    setIsEditing,
    handleLogout,
    loadMe,
  };
}

export default useMe;
