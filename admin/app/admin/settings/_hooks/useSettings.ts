import api from "@/axios/interceptor";
import { ISettings } from "@/interfaces/global";
import { settingCreateZ, SettingFromValue } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useSettings() {
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  // 🧩 Default form values
  const form = useForm<SettingFromValue>({
    resolver: zodResolver(settingCreateZ),
    defaultValues: {
      siteName: "",
      siteDescription: "",
      contactEmail: "",
      contactPhone: "",
      logo: { url: "", alt: "" },
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  });

  // 🧠 Fetch settings
  const getSettings = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/settings", {});
      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something went wrong!");
      }
      setSettings(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 💾 Update handler
  const handleUpdate = async (data: SettingFromValue) => {
    setIsLoading(true);

    try {
      const response = await api.patch("/settings", data, {});

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      toast(response.data.message || "Settings updated successfully!");
      await getSettings();
    } catch (error: any) {
      console.error("Error updating settings:", error);
      if (error.response?.data?.fields) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, { message: field.message });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 🖼️ Logo upload
  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;

    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError("File size is too large. Maximum size is 10MB.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await api.post(`/settings/upload-logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      toast(response.data.message || "Logo changed successfully!");
      getSettings();
      setIsAvatarOpen(false);
    } catch (error: any) {
      console.log("Error uploading logo:", error);
    }
  };

  // ⚙️ Load settings on mount
  useEffect(() => {
    getSettings();
  }, []);

  // 🪄 When settings fetched, reset form
  useEffect(() => {
    if (settings) {
      form.reset({
        siteName: settings.siteName || "",
        siteDescription: settings.siteDescription || "",
        contactEmail: settings.contactEmail || "",
        contactPhone: settings.contactPhone || "",
        logo: {
          url: settings.logo?.url || "",
          alt: settings.siteName || "",
        },
        socialLinks: {
          facebook: settings.socialLinks?.facebook || "",
          twitter: settings.socialLinks?.twitter || "",
          instagram: settings.socialLinks?.instagram || "",
          linkedin: settings.socialLinks?.linkedin || "",
        },
        address: {
          street: settings.address?.street || "",
          city: settings.address?.city || "",
          state: settings.address?.state || "",
          zipCode: settings.address?.zipCode || "",
          country: settings.address?.country || "",
        },
      });
    }
  }, [settings]);

  return {
    settings,
    isLoading,
    error,
    setError,
    form,
    handleUpdate,
    uploadHandler,
    isAvatarOpen,
    setIsAvatarOpen,
  };
}
