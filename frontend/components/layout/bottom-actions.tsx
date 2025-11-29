import { Store, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";

function BottomActions() {
  const actions = [
    { href: "/shop", label: "Shop", icon: Store },
    { href: "/wishlist", label: "Wishlist", icon: Heart, countable: true },
    { href: "/cart", label: "Cart", icon: ShoppingCart, countable: true },
    { href: "/account", label: "Account", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around pt-1 bg-background/95 backdrop-blur-sm border-t border-border">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link href={action.href} key={action.label}>
            <button className="relative transition-colors duration-300 bg-transparent hover:bg-transparent cursor-pointer flex flex-col items-center p-1 gap-0.5">
              <div className="relative">
                <Icon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                {action.countable && (
                  <span className="absolute -top-1 -right-4 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    0
                  </span>
                )}
              </div>
              <span className="text-sm font-cormorant font-medium capitalize">
                {action.label}
              </span>
            </button>
          </Link>
        );
      })}
    </div>
  );
}

export default BottomActions;
