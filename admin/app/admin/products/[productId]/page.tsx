import { mockProduct, salesAnalytics } from "@/lib/mock-data";
import { AnalyticsCards } from "./_components/analytics-cards";
import { ProductDetails } from "./_components/product-details";
import { ProductHeader } from "./_components/product-header";
import { ProductImages } from "./_components/product-images";
import { ProductInfo } from "./_components/product-info";
import { SalesChart } from "./_components/sales-chart";
import { TopVariants } from "./_components/top-variants";
import { VariantsTable } from "./_components/variants-table";
import { ViewsChart } from "./_components/views-chart";

export default function ProductAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <ProductHeader product={mockProduct} />

        <div className="mt-8 space-y-6">
          {/* Analytics Overview */}
          <AnalyticsCards
            totalSales={salesAnalytics.totalSales}
            totalRevenue={salesAnalytics.totalRevenue}
            avgOrderValue={salesAnalytics.avgOrderValue}
            conversionRate={salesAnalytics.conversionRate}
          />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart data={salesAnalytics.monthlyData} />
            <ViewsChart data={salesAnalytics.dailyViews} />
          </div>

          {/* Product Details Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProductImages images={mockProduct.images} />
            <div className="lg:col-span-2 space-y-6">
              <ProductInfo product={mockProduct} />
              <ProductDetails details={mockProduct.details} />
            </div>
          </div>

          {/* Variants Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VariantsTable variants={mockProduct.variants} />
            </div>
            <TopVariants data={salesAnalytics.topVariants} />
          </div>
        </div>
      </div>
    </div>
  );
}
