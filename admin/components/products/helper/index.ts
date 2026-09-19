import { IKidsProduct } from "@/interfaces/kids";
import { IImage, IProduct, IProductVariant } from "@/interfaces/products";
import { toast } from "sonner";
import z from "zod";

export type KeyValue = { key: string; value: string };
export type ProductImage = Pick<IImage, "url"> & { alt?: string };
export type FormProps = {
  product: IProduct;
  onClose: () => void;
};
export type KidsFormProps = {
  product: IKidsProduct;
  onClose: () => void;
};
export type KidsDialogProps = KidsFormProps & {
  type: string;
  product?: IKidsProduct;
};
export type DialogProps = FormProps & {
  type: string;
  product?: IProduct;
};

const keyValuesZ = z.array(
  z.object({
    key: z.string().trim().min(1, "Name is required"),
    value: z.string().trim().min(1, "Value is required"),
  }),
);
export const generalZ = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  description: z.string().max(1000).optional(),
  keyFeatures: z.array(z.string()),
  specifications: keyValuesZ,
  categories: z.array(z.string()).min(1, "Select at least one category"),
  tags: z.array(z.string()),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

export const kidsGeneralZ = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    fabric: z.string().trim().min(1, "Fabric is required"),
    description: z.string().max(1000).optional(),
    sizes: z.array(z.string().trim().min(1)).min(1, "Add at least one size"),
    colors: z.array(z.string().trim().min(1)).min(1, "Add at least one color"),
    isActive: z.boolean(),
    moq: z.coerce.number().min(0, "MOQ must be 0 or more"),
    minPrice: z.coerce.number().min(0, "Minimum price must be 0 or more"),
    maxPrice: z.coerce.number().min(0, "Maximum price must be 0 or more"),
  })
  .refine((data) => data.maxPrice >= data.minPrice, {
    message: "Maximum price must be greater than or equal to minimum price",
    path: ["maxPrice"],
  });

export const discountZ = z.object({
  discount: z
    .object({
      discountType: z.enum(["percentage", "fixed"]),
      value: z.number().min(0, "Discount value must be non-negative"),
      startAt: z.coerce.date().optional(),
      endAt: z.coerce.date().optional(),
    })
    .optional()
    .refine(
      (discount) =>
        !discount?.startAt ||
        !discount?.endAt ||
        discount.startAt < discount.endAt,
      {
        message: "Discount start date must be before the end date",
        path: ["endAt"],
      },
    ),
});
export const variantZ = z.object({
  sku: z.string().trim().min(1, "SKU is required"),
  attributes: keyValuesZ,
  stock: z.coerce.number().int().min(0),
  price: z.coerce.number().min(0),
});
export const imagesZ = z.object({ images: z.array(z.instanceof(File)) });
export type KidsGeneralValues = z.output<typeof kidsGeneralZ>;
export type KidsGeneralInput = z.input<typeof kidsGeneralZ>;
export type GeneralValues = z.output<typeof generalZ>;
export type GeneralInput = z.input<typeof generalZ>;
export type DiscountValues = z.output<typeof discountZ>;
export type DiscountInput = z.input<typeof discountZ>;
export type VariantValues = z.output<typeof variantZ>;
export type VariantInput = z.input<typeof variantZ>;
export type ImageInput = z.input<typeof imagesZ>;
export type ImageValues = z.output<typeof imagesZ>;

export const toKeyValues = (
  value?: Map<string, string> | Record<string, string>,
): KeyValue[] =>
  value
    ? Object.entries(
        value instanceof Map ? Object.fromEntries(value) : value,
      ).map(([key, item]) => ({ key, value: String(item) }))
    : [];
export const label = (variant: IProductVariant) =>
  `${variant.sku} — ৳${variant.price} · Stock: ${variant.stock}`;
export const reportError = (error: unknown, fallback: string) => {
  const data = (
    error as {
      response?: { data?: { error?: { message?: string }; message?: string } };
    }
  ).response?.data;
  toast.error(data?.error?.message ?? data?.message ?? fallback);
};
