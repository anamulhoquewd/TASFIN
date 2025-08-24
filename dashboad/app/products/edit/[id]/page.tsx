import { CreateProductForm } from "../../_components/form";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Update Product
            </h1>
            <p className="text-muted-foreground mt-2">
              Update the product details, including images and variants.
            </p>
          </div>
          <CreateProductForm isUpdate={true} />
        </div>
      </div>
    </div>
  );
}
