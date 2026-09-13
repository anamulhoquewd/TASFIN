"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MyOrderCard from "@/components/user-dashboard/my-order-card";
import useOrders from "@/hooks/orders/use-orders";
import useUsers from "@/hooks/users/use-users";
import { IOrder } from "@/interfaces/orders";
import { IUser } from "@/interfaces/users";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [profile, setProfile] = useState<IUser>();

  const { getOrdersByUserId } = useOrders();

  const { getProfile } = useUsers();

  useEffect(() => {
    const fetched = async () => {
      try {
        getProfile().then(async (data) => {
          setProfile(data.data);
          const response = await getOrdersByUserId({
            userId: data.data._id,
            limit: 4,
          });

          setOrders(response.data);
        });
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    fetched();
  }, []);

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile?.name}!</h1>
        <p className="text-muted-foreground mt-2">
          Manage your orders and account
        </p>
      </div>

      {/* <DashboardOverview /> */}

      <h2 className="text-lg font-medium">Your Recent Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.length > 0 ? (
          orders.map((order) => <MyOrderCard key={order._id} order={order} />)
        ) : (
          <Card>
            <CardContent className="py-8 flex flex-col items-center justify-center">
              <p className="text-muted-foreground">
                Looks like your order list is empty. Time to treat yourself!
              </p>

              <Link href="/shop">
                <Button className="cursor-pointer" variant={"link"} size={"sm"}>
                  Go Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
