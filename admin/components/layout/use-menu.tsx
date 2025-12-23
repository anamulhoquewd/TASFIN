"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMe from "@/hooks/auth/useMe";
import { CircleUser, LogOut } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmation } from "../delete-confirmation";

export default function UserMenu() {
  const { handleLogout, user } = useMe();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              className="object-cover"
              src={user?.avatar?.url}
              alt={user?.name || "TASFIN"}
            />
            <AvatarFallback>{user?.name?.charAt(0) || "TASFIN"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.name || "TASFIN"}</p>
            <p className="text-xs text-muted-foreground">
              {user?.email || "info@tasfin.com"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <a href="/admin/me">
            <DropdownMenuItem className="cursor-pointer">
              <CircleUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DeleteConfirmation
          open={open}
          changeOpen={setOpen}
          onConfirm={handleLogout}
        />
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
