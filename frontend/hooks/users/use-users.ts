import { getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { IAddress } from "@/interfaces/orders";
import { useCallback, useState } from "react";

function useUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = useCallback(async () => {
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
  }, []);

  const updateAddress = async (addressId: string, address: IAddress) => {
    const id = await getCookie("X-User-ID");
    const response = await api.patch(
      `/users/me/addresses/${addressId}`,
      address,
      {
        headers: { "X-User-ID": id },
      },
    );
    return response.data;
  };

  const deleteAddress = async (addressId: string) => {
    const id = await getCookie("X-User-ID");
    const response = await api.delete(`/users/me/addresses/${addressId}`, {
      headers: { "X-User-ID": id },
    });
    return response.data;
  };

  return {
    getProfile,
    updateAddress,
    deleteAddress,
    isLoading,
  };
}

export default useUsers;
