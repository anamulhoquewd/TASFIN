import Header from "@/components/layout/header";
import { AppSidebar } from "@/components/side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="flex-1 min-h-screen flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
