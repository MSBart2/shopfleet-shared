import { z } from 'zod';
export const UserCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export const AddressSchema = z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().length(2),
});
export const OrderItemSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
});
export const CreateOrderSchema = z.object({
    items: z.array(OrderItemSchema).min(1),
    shippingAddress: AddressSchema,
});
export const ProductSearchSchema = z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.number().int().nonnegative().optional(),
    maxPrice: z.number().int().positive().optional(),
    inStock: z.boolean().optional(),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().nonnegative().default(0),
});
