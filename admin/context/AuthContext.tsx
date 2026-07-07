"use client";

import { IAdmin } from "@/interfaces/users";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: IAdmin | null;
  setUser: (user: IAdmin | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IAdmin | null>(null);
  const router = useRouter();

  const logout = async () => {
    try {
      setUser(null);
      router.push("/auth/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
