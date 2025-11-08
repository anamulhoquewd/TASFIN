import api from "@/axios/interceptor";
import { useState } from "react";

function useUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/users/me");

      if (response.data.success) {
        return response.data;
      }
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getProfile,
    isLoading,
  };
}

export default useUsers;
