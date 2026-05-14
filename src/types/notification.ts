export type NotificationType =
  | 'order_confirmed'
  | 'order_shipped'
  | 'order_delivered'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'welcome';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: 'email' | 'sms' | 'push';
  subject: string;
  body: string;
  sentAt?: string;
  createdAt: string;
}

export interface NotificationEvent {
  type: NotificationType;
  userId: string;
  data: Record<string, unknown>;
}
