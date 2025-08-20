"use client";

import api from "@/api/axios-init";
import { useState, useCallback } from "react";
import { toast } from "sonner";

function useUploads() {
  const [data, setData] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFiles = useCallback(async (files: File[], slug: string) => {
    setData(null);
    setIsLoading(true);

    console.log("Files: ", files);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("image", file); // Changed key to 'images' to indicate multiple files
      });

      console.log("Form Data: ", formData);

      const response = await api.post("/uploads", formData, {
        params: { slug },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      toast(response.data?.message || "Files has been uploaded in S3.");

      setData(response.data.data);
      return { success: true, urls: response.data.data };
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { uploadFiles, isLoading, data };
}

export default useUploads;
