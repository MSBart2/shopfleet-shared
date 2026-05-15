import { z } from 'zod';
export declare const UserCredentialsSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const AddressSchema: z.ZodObject<{
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
}, "strip", z.ZodTypeAny, {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    line2?: string | undefined;
}, {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    line2?: string | undefined;
}>;
export declare const OrderItemSchema: z.ZodObject<{
    productId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId: string;
    quantity: number;
}, {
    productId: string;
    quantity: number;
}>;
export declare const CreateOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        quantity: number;
    }, {
        productId: string;
        quantity: number;
    }>, "many">;
    shippingAddress: z.ZodObject<{
        line1: z.ZodString;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        line2?: string | undefined;
    }, {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        line2?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        line2?: string | undefined;
    };
}, {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        line2?: string | undefined;
    };
}>;
export declare const ProductSearchSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    inStock: z.ZodOptional<z.ZodBoolean>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    query?: string | undefined;
    category?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    inStock?: boolean | undefined;
}, {
    query?: string | undefined;
    category?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    inStock?: boolean | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
