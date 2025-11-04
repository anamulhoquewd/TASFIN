# updateProduct Function Documentation

## Overview

The `updateProduct` function is a comprehensive TypeScript function that handles updating existing products in a database. It supports all CRUD operations for product management including basic fields, images, variants, and categories.

## Function Signature

```typescript
const updateProduct = async (
  productId: string,
  updateData: ProductUpdateInput
): Promise<{ success: boolean; data?: IProduct; error?: string }>
```

## Parameters

- **productId** (string): The unique identifier of the product to update
- **updateData** (ProductUpdateInput): Object containing the fields to update

## Return Value

Returns a Promise that resolves to an object with:

- **success** (boolean): Whether the update operation was successful
- **data** (IProduct, optional): The updated product object
- **error** (string, optional): Error message if the operation failed

## Features

### 1. Basic Product Fields Update

- ✅ Product title and slug
- ✅ Description (HTML and JSON)
- ✅ Fabric, value addition, cut & fit
- ✅ Collar/neck, sleeve, length
- ✅ Wash care, side cut
- ✅ Featured and active status
- ✅ Tags

### 2. Product Images Management

- ✅ Add new images (File objects)
- ✅ Remove existing images
- ✅ Replace/update images
- ✅ Handle multiple image uploads

### 3. Variants Management

- ✅ Add new variants (size, color, stock, price)
- ✅ Update existing variants
- ✅ Delete variants
- ✅ Variant-specific images
- ✅ Stock and price management

### 4. Categories Management

- ✅ Add categories
- ✅ Remove categories
- ✅ Replace entire category list

### 5. Error Handling & Validation

- ✅ Product existence validation
- ✅ Field validation using Zod schemas
- ✅ Graceful error handling
- ✅ Form error mapping

## Usage Examples

### Basic Product Update

```typescript
import { updateProduct } from "@/app/products/_hook/useProducts";

const basicUpdate = {
  title: "Updated Product Title",
  slug: "updated-product-slug",
  description: "Updated description",
  isFeatured: true,
};

const result = await updateProduct("product-id", basicUpdate);
if (result.success) {
  console.log("Product updated:", result.data);
} else {
  console.error("Update failed:", result.error);
}
```

### Adding New Images

```typescript
const imageUpdate = {
  images: [file1, file2, file3], // File objects from file input
};

const result = await updateProduct("product-id", imageUpdate);
```

### Managing Variants

```typescript
const variantUpdate = {
  variants: [
    {
      size: "S",
      stock: 10,
      price: 29.99,
      images: [variantImage1, variantImage2],
    },
    {
      _id: "existing-variant-id", // For updating existing variants
      size: "M",
      stock: 15,
      price: 29.99,
      images: [],
    },
  ],
};

const result = await updateProduct("product-id", variantUpdate);
```

### Category Management

```typescript
const categoryUpdate = {
  categories: ["category-id-1", "category-id-2", "category-id-3"],
};

const result = await updateProduct("product-id", categoryUpdate);
```

### Comprehensive Update

```typescript
const comprehensiveUpdate = {
  title: "Premium Cotton T-Shirt",
  slug: "premium-cotton-tshirt",
  description: {
    html: "<p>High-quality cotton t-shirt</p>",
    json: { content: "Premium cotton description" },
  },
  categories: ["clothing", "t-shirts"],
  tags: ["premium", "cotton", "comfortable"],
  fabric: "100% Premium Cotton",
  valueAddition: "Eco-friendly",
  cutFit: "Regular Fit",
  collarNeck: "Round Neck",
  sleeve: "Short Sleeve",
  length: "Regular Length",
  washCare: "Machine wash cold",
  sideCut: "Standard cut",
  isFeatured: true,
  isActive: true,
  variants: [
    {
      size: "S",
      stock: 25,
      price: 24.99,
      images: [],
    },
  ],
};

const result = await updateProduct("product-id", comprehensiveUpdate);
```

## Error Handling

### Product Not Found

```typescript
try {
  const result = await updateProduct("non-existent-id", updateData);
} catch (error) {
  if (error.message === "Product not found") {
    // Handle product not found
  }
}
```

### Validation Errors

```typescript
try {
  const result = await updateProduct("product-id", invalidData);
} catch (error) {
  if (error.response?.data?.fields) {
    // Handle field validation errors
    error.response.data.fields.forEach((field) => {
      console.error(`${field.name}: ${field.message}`);
    });
  }
}
```

## Helper Functions

### Image Operations Helper

```typescript
const handleVariantImageOperations = (
  variantId: string,
  operations: {
    add?: File[];
    remove?: string[];
    replace?: { oldUrl: string; newFile: File };
  }
) => {
  // Returns FormData for variant image operations
};
```

### Category Operations Helper

```typescript
const handleCategoryOperations = (
  currentCategories: string[],
  newCategories: string[]
) => {
  // Returns { added: string[], removed: string[] }
};
```

## Database Model Assumptions

The function assumes the following database structure:

### Product Model

```typescript
interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: {
    html: string;
    json: any;
  };
  categories: string[];
  images: IImage[];
  variants: IProductVariant[];
  fabric?: string;
  valueAddition?: string;
  cutFit?: string;
  collarNeck?: string;
  sleeve?: string;
  length?: string;
  washCare?: string;
  sideCut?: string;
  isFeatured?: boolean;
  isActive: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Variant Model

```typescript
interface IProductVariant {
  _id: string;
  size: string;
  stock: number;
  price: number;
  images?: IImage[];
}
```

### Image Model

```typescript
interface IImage {
  alt: string;
  url: string;
}
```

## API Endpoint

The function makes a PUT request to:

```
PUT http://localhost:4000/api/v1/products/{productId}
```

With `Content-Type: multipart/form-data` for handling file uploads.

## Dependencies

- **axios**: For HTTP requests
- **react-hook-form**: For form management
- **zod**: For validation schemas
- **sonner**: For toast notifications

## TypeScript Support

The function is fully typed with TypeScript interfaces:

- `ProductUpdateInput`: Input data type
- `IProduct`: Product model type
- `IProductVariant`: Variant model type
- `IUpdateProductResult`: Return type

## Best Practices

1. **Always validate input data** before calling the function
2. **Handle errors gracefully** with proper user feedback
3. **Use partial updates** when only specific fields need updating
4. **Validate file types and sizes** before uploading images
5. **Check product existence** before attempting updates
6. **Use proper loading states** during update operations

## Integration with React Components

The function is designed to work seamlessly with React components:

```typescript
const EditProductPage = () => {
  const { updateProduct } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProductUpdateInput) => {
    setIsLoading(true);
    try {
      const result = await updateProduct(productId, data);
      if (result.success) {
        // Handle success
        router.push("/products");
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
};
```
