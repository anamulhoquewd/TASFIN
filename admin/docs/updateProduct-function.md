# updateProduct Function Guide

## Overview

`updateProduct` lives inside `admin/app/admin/products/_hook/useProducts.ts`. The function submits product updates to the API by translating the form payload into `FormData`, handling top-level fields, image uploads/removals, and variant edits. It is currently the single entry point used by the edit page (`admin/app/admin/products/edit/[id]/page.tsx`).

## Function Signature

```typescript
async function updateProduct(
  productId: string,
  updateData: any
): Promise<{
  success?: boolean;
  data?: unknown;
} | void>;
```

> **Note**: Although the consumer passes `ProductUpdateInput`, the function itself is typed as `any`. Shape mismatches will only surface at runtime.

## Accepted Payload Shape

The helper understands the following properties on `updateData` and silently ignores the rest:

- `name?: string`
- `description?: string | null`
- `price?: number | string`
- `newImages?: File[]` – newly added main product images
- `deleteImageUrls?: string[]` – URLs of main product images that should be removed
- `variants?: Array<{
  id?: string; // existing variant identifier
  size?: string;
  stock?: number;
  price?: number;
  newImages?: File[];
  deleteImageUrls?: string[];
}>`
- `categories?: string[]` – category IDs to keep; sent as repeated `categories` entries in `FormData`

Any other field (e.g. `title`, `slug`, `fabric`) is **not** forwarded to the API with the current implementation.

## Field Handling Details

- **Basics** – `name`, `description`, and `price` are appended only when defined. Empty strings are sent for `description` when you pass a falsey value.
- **Main Images** – Files from `newImages` are appended as repeated `images` parts. URLs in `deleteImageUrls` are stringified and sent once.
- **Variants** – Each variant is namespaced as `variants[index][field]`. New variant images are appended individually, while `deleteImageUrls` is JSON-stringified per variant. Missing values default to empty strings or `0` before submission.
- **Categories** – Each category ID is appended as its own `categories` entry, matching the backend’s expected format.

## API Contract

- **Endpoint**: `PUT /products/:productId`
- **Headers**: `Content-Type: multipart/form-data`
- **Success Path**: Displays a success toast, resets the product creation form, triggers a fresh product list fetch, and returns `{ success: true, data: response.data.data }`.
- **Failure Path**: Maps backend `fields` errors onto the form via `form.setError` and shows a generic toast. The promise resolves to `void` in error cases.

## Usage Example

```typescript
import useProducts from "@/app/admin/products/_hook/useProducts";

const { updateProduct } = useProducts();

await updateProduct(productId, {
  name: formData.title, // map title -> name until the hook is updated
  description: formData.description,
  price: formData.basePrice,
  categories: formData.categories,
  newImages: formData.images, // File[]
  deleteImageUrls,
  variants: formData.variants.map((variant) => ({
    id: variant._id,
    size: variant.size,
    stock: variant.stock,
    price: variant.price,
    newImages: variant.images,
    deleteImageUrls: variant.deleteImageUrls,
  })),
});
```

## Side Effects

- Resets the shared product form to its initial state
- Clears variant previews managed in `useProducts`
- Calls `getProducts` to refresh the listing view
- Emits toasts via `sonner`

## Current Limitations

- No support for fields such as `title`, `slug`, `fabric`, `tags`, or boolean flags—even though the edit form collects them.
- The payload type is `any`, reducing type-safety despite the `ProductUpdateInput` schema defined in `@/lib/schemas`.
- Category updates replace the entire list; there is no diffing or add/remove granularity.

When extending the hook, make sure to append the additional fields to `FormData` and align the documentation accordingly.
