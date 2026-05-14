# ShopFleet Shared

Shared types, schemas, and validation utilities for the ShopFleet microservices ecosystem.

## Installation

```bash
npm install @shopfleet/shared
```

## Usage

```typescript
import { User, Order, OrderStatus, CreateOrderSchema } from '@shopfleet/shared';

// Type-safe user
const user: User = {
  id: '123',
  email: 'customer@example.com',
  name: 'Jane Doe',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Validate order input
const result = CreateOrderSchema.safeParse(input);
if (result.success) {
  // result.data is typed
}
```

## Exports

- **Types**: `User`, `Product`, `Order`, `Payment`, `Notification`
- **Schemas**: Zod schemas for validation
- **Enums**: `OrderStatus`, `PaymentStatus`, `NotificationType`

## Development

```bash
npm install
npm run build
npm test
```

## Part of ShopFleet

This is the foundation library for the ShopFleet microservices demo, designed to showcase multi-repo orchestration with cli-acp.
