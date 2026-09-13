import { getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { useState } from "react";

function useUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    const id = (await getCookie("X-User-ID")) as string;
    console.log("Id: ", id);
    try {
      const response = await api.get("/users/me", {
        headers: { "X-User-ID": id },
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
