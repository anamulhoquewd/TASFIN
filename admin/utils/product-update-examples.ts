import type {
  IProductUpdateData,
  IProductVariantUpdate,
  IImageOperation,
  ICategoryOperation,
} from "@/interfaces/products";

/**
 * Example usage of the updateProduct function for different scenarios
 */

// Example 1: Basic product fields update
export const basicProductUpdate = (productId: string): IProductUpdateData => {
  return {
    title: "Updated Product Title",
    slug: "updated-product-slug",
    description: {
      html: "<p>Updated product description</p>",
      json: { content: "Updated description content" },
    },
    fabric: "Premium Cotton",
    valueAddition: "Eco-friendly material",
    isFeatured: true,
    isActive: true,
  };
};

// Example 2: Product images management
export const productImagesUpdate = (productId: string): IProductUpdateData => {
  // This would be used with actual File objects from file input
  return {
    images: [], // Array of File objects for new images
  };
};

// Example 3: Variants management - Add new variants
export const addNewVariants = (productId: string): IProductUpdateData => {
  return {
    variants: [
      {
        size: "S",
        color: "Red",
        stock: 10,
        price: 29.99,
        images: [], // Array of File objects for variant images
      },
      {
        size: "M",
        color: "Blue",
        stock: 15,
        price: 29.99,
        images: [],
      },
    ],
  };
};

// Example 4: Variants management - Update existing variants
export const updateExistingVariants = (
  productId: string
): IProductUpdateData => {
  return {
    variants: [
      {
        _id: "existing-variant-id", // Include _id for existing variants
        size: "L",
        color: "Green",
        stock: 20,
        price: 34.99,
        images: [],
      },
    ],
  };
};

// Example 5: Categories management
export const categoriesUpdate = (productId: string): IProductUpdateData => {
  return {
    categories: ["category-id-1", "category-id-2", "category-id-3"],
  };
};

// Example 6: Tags management
export const tagsUpdate = (productId: string): IProductUpdateData => {
  return {
    tags: ["summer", "casual", "cotton", "trendy"],
  };
};

// Example 7: Comprehensive update with all fields
export const comprehensiveProductUpdate = (
  productId: string
): IProductUpdateData => {
  return {
    title: "Premium Cotton T-Shirt",
    slug: "premium-cotton-tshirt",
    description: {
      html: "<p>High-quality cotton t-shirt with excellent comfort and durability.</p>",
      json: {
        content: "Premium cotton t-shirt description",
        features: ["Breathable", "Durable", "Comfortable"],
      },
    },
    categories: ["clothing", "t-shirts", "cotton"],
    tags: ["premium", "cotton", "comfortable", "durable"],
    fabric: "100% Premium Cotton",
    valueAddition: "Eco-friendly and sustainable",
    cutFit: "Regular Fit",
    collarNeck: "Round Neck",
    sleeve: "Short Sleeve",
    length: "Regular Length",
    washCare: "Machine wash cold, tumble dry low",
    sideCut: "Standard cut",
    isFeatured: true,
    isActive: true,
    variants: [
      {
        size: "S",
        color: "White",
        stock: 25,
        price: 24.99,
        images: [],
      },
      {
        size: "M",
        color: "Black",
        stock: 30,
        price: 24.99,
        images: [],
      },
      {
        size: "L",
        color: "Navy",
        stock: 20,
        price: 24.99,
        images: [],
      },
    ],
  };
};

// Example 8: Partial update - only specific fields
export const partialProductUpdate = (productId: string): IProductUpdateData => {
  return {
    price: 39.99, // Only updating price
    isFeatured: true, // Only updating featured status
  };
};

// Example 9: Image operations helper
export const createImageOperations = (): IImageOperation => {
  return {
    add: [], // Array of File objects to add
    remove: ["image-url-1", "image-url-2"], // Array of image URLs to remove
    replace: {
      oldUrl: "old-image-url",
      newFile: new File([], "new-image.jpg"), // Replace specific image
    },
  };
};

// Example 10: Category operations helper
export const createCategoryOperations = (
  currentCategories: string[],
  newCategories: string[]
): ICategoryOperation => {
  const added = newCategories.filter((cat) => !currentCategories.includes(cat));
  const removed = currentCategories.filter(
    (cat) => !newCategories.includes(cat)
  );

  return { added, removed };
};

// Example 11: Validation helper for variant data
export const validateVariantData = (
  variant: IProductVariantUpdate
): boolean => {
  if (!variant.size || !variant.color) {
    console.error("Variant size and color are required");
    return false;
  }

  if (variant.stock < 0 || variant.price < 0) {
    console.error("Variant stock and price must be non-negative");
    return false;
  }

  return true;
};

// Example 12: Usage with the updateProduct function
export const exampleUsage = async (productId: string) => {
  // Import the updateProduct function from useProducts
  // const { updateProduct } = useProducts();

  try {
    // Basic update
    const basicUpdate = basicProductUpdate(productId);
    // const result1 = await updateProduct(productId, basicUpdate);

    // Comprehensive update
    const comprehensiveUpdate = comprehensiveProductUpdate(productId);
    // const result2 = await updateProduct(productId, comprehensiveUpdate);

    // Partial update
    const partialUpdate = partialProductUpdate(productId);
    // const result3 = await updateProduct(productId, partialUpdate);

    console.log("Update operations completed");
  } catch (error) {
    console.error("Error in update operations:", error);
  }
};

// Example 13: Error handling patterns
export const handleUpdateErrors = (error: any) => {
  if (error.message === "Product not found") {
    console.error("The product you're trying to update doesn't exist");
    // Handle product not found
  } else if (error.response?.data?.fields) {
    // Handle validation errors
    error.response.data.fields.forEach((field: any) => {
      console.error(`Field ${field.name}: ${field.message}`);
    });
  } else {
    console.error("Unexpected error:", error.message);
  }
};

// Example 14: Success handling patterns
export const handleUpdateSuccess = (result: any) => {
  if (result.success) {
    console.log("Product updated successfully:", result.data);
    // Handle successful update
    // e.g., show success message, redirect, refresh data
  } else {
    console.error("Update failed:", result.error);
    // Handle update failure
  }
};
