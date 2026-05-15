export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    inventory: number;
    category: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}
export interface ProductSearchParams {
    query?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    limit?: number;
    offset?: number;
}
