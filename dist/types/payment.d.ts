export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
export interface Payment {
    id: string;
    orderId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    method: 'card' | 'bank_transfer';
    last4?: string;
    createdAt: string;
    updatedAt: string;
}
export interface PaymentIntent {
    clientSecret: string;
    paymentId: string;
    amount: number;
    currency: string;
}
