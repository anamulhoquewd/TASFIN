"use client";

import { LayoutDashboard, Settings, ShoppingCart, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IUser } from "@/interfaces/users";
import useUsers from "@/hooks/users/use-users";
import { useEffect, useState } from "react";
import LoadingPage from "../loading-page";

// This is sample data.
const data = {
  navMain: [
    { icon: LayoutDashboard, label: "Dashboard", url: "/dashboard" },
    { icon: ShoppingCart, label: "My orders", url: "/dashboard/orders" },
    { icon: Settings, label: "Account", url: "/dashboard/account" },
  ],
};

export function AppSidebar({ ...props }) {
  const [user, setUser] = useState<IUser | null>(null);
  const { getProfile, isLoading } = useUsers();

  useEffect(() => {
    const fetched = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (e) {
        console.log("Error:: ", e);
      }
    };

    fetched();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Sidebar className="mt-8" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <User className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">{user?.name || "TASFIN"}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email || user?.phone}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.url} className="flex gap-2 items-center">
                    <SidebarMenuButton className="font-medium cursor-pointer">
                      <Icon className="h-4 w-4" /> {item.label}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
            {/* <SidebarMenuItem className="mt-4">
              <Button
                variant={"destructive"}
                className="font-medium cursor-pointer w-full"
              >
                Log out
              </Button>
            </SidebarMenuItem> */}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
