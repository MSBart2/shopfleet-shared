export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    pricePerUnit: number;
}
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: OrderStatus;
    subtotal: number;
    tax: number;
    total: number;
    shippingAddress: Address;
    createdAt: string;
    updatedAt: string;
}
export interface Address {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
