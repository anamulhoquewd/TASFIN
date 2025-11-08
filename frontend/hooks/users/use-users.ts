import { getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { useState } from "react";

function useUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    const phone = (await getCookie("X-User-ID")) as string;
    try {
      const response = await api.get("/users/me", {
        headers: { Authorization: phone },
      });

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
