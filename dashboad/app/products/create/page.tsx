import { CreateProductForm } from "../_components/form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Create Product
            </h1>
            <p className="text-muted-foreground mt-2">
              Add a new product to your inventory with images and variants.
            </p>
          </div>
          <CreateProductForm isUpdate={false} />
        </div>
      </div>
    </div>
  );
}
