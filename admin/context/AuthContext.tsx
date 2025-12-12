"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IAdmin } from "@/interfaces/users";
import { deleteAllAuthCookies } from "@/app/actions";

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
      // Clear all auth cookies
      await deleteAllAuthCookies();
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
