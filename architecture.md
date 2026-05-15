# Architecture — shopfleet-shared

> Technical dictionary for `@shopfleet/shared`. This is the authoritative reference for types, schemas, contracts, and layout for all ShopFleet services that consume this library.

---

## Role & Boundaries

`@shopfleet/shared` is a **zero-business-logic library**. It owns:

- TypeScript type definitions (compile-time contracts)
- Zod validation schemas (runtime input validation)
- Shared enumerations (status strings, channel names, notification types)

It does **not** own: HTTP routing, database models, business rules, service orchestration, or authentication logic. Those belong to the consuming microservices.

**Consumers** (from `acp-manifest.json`):
- `shopfleet-orchestrator`
- `shopfleet-users`
- `shopfleet-products`
- `shopfleet-orders`
- `shopfleet-payments`
- `shopfleet-notifications`

---

## Package Identity

| Field        | Value                                   |
|--------------|-----------------------------------------|
| Package name | `@shopfleet/shared`                     |
| Entry point  | `dist/index.js`                         |
| Types entry  | `dist/index.d.ts`                       |
| Module type  | ESM (`"type": "module"`)                |
| TS target    | ES2022, `moduleResolution: NodeNext`    |
| Runtime dep  | `zod ^3.23.0` only                      |

---

## Source Layout

```
src/
├── index.ts              # Sole public API — re-exports all types and schemas
├── types/
│   ├── user.ts           # User, UserCredentials, AuthToken
│   ├── product.ts        # Product, ProductSearchParams
│   ├── order.ts          # Order, OrderItem, OrderStatus, Address
│   ├── payment.ts        # Payment, PaymentIntent, PaymentStatus
│   └── notification.ts   # Notification, NotificationEvent, NotificationType
└── schemas/
    └── index.ts          # All Zod schemas (single file)
```

**Rule:** types are compile-time only (no imports from `zod`). All runtime Zod code lives exclusively in `src/schemas/index.ts`.

---

## Type Contracts

### Global field conventions

| Convention | Detail |
|---|---|
| Monetary fields | Integer **cents** — never floats or dollars |
| Date fields (`createdAt`, `updatedAt`, `sentAt`) | ISO 8601 `string` — never `Date` objects |
| Status/enum fields | String union literals — never TypeScript `enum` |
| `id` fields | `string` (UUID expected by convention; UUID enforcement is in schemas) |
| `country` | 2-letter ISO 3166-1 alpha-2 code |

---

### `User` (`src/types/user.ts`)

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;  // ISO 8601
  updatedAt: string;  // ISO 8601
}

interface UserCredentials {
  email: string;
  password: string;
}

interface AuthToken {
  token: string;
  expiresAt: string;  // ISO 8601
  userId: string;
}
```

---

### `Product` (`src/types/product.ts`)

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;       // cents
  currency: string;
  inventory: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductSearchParams {
  query?: string;
  category?: string;
  minPrice?: number;   // cents
  maxPrice?: number;   // cents
  inStock?: boolean;
  limit?: number;
  offset?: number;
}
```

---

### `Order` (`src/types/order.ts`)

```typescript
type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;  // cents
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;         // cents
  tax: number;              // cents
  total: number;            // cents
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;  // 2-letter ISO code
}
```

---

### `Payment` (`src/types/payment.ts`)

```typescript
type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded';

interface Payment {
  id: string;
  orderId: string;
  amount: number;           // cents
  currency: string;
  status: PaymentStatus;
  method: 'card' | 'bank_transfer';
  last4?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentIntent {
  clientSecret: string;
  paymentId: string;
  amount: number;    // cents
  currency: string;
}
```

---

### `Notification` (`src/types/notification.ts`)

```typescript
type NotificationType =
  | 'order_confirmed'
  | 'order_shipped'
  | 'order_delivered'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'welcome';

interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: 'email' | 'sms' | 'push';
  subject: string;
  body: string;
  sentAt?: string;   // ISO 8601; absent if not yet sent
  createdAt: string;
}

interface NotificationEvent {
  type: NotificationType;
  userId: string;
  data: Record<string, unknown>;  // event-specific payload
}
```

---

## Zod Schemas (`src/schemas/index.ts`)

Schemas validate **input** shapes — they do not include `id`, `createdAt`, or `updatedAt` (those are server-generated). All schemas use `z.object()` and are exported individually.

| Schema | Validates | Key constraints |
|---|---|---|
| `UserCredentialsSchema` | Login/registration payload | `email` valid email; `password` min 8 chars |
| `AddressSchema` | Shipping address input | All fields non-empty; `country` exactly 2 chars |
| `OrderItemSchema` | Single line item in an order | `productId` UUID; `quantity` positive integer |
| `CreateOrderSchema` | New order request body | `items` array min length 1; embeds `AddressSchema` |
| `ProductSearchSchema` | Product listing query params | `limit` 1–100 (default 20); `offset` ≥ 0 (default 0); prices non-negative integers |

### Detailed schema constraints

```
UserCredentialsSchema
  email        → z.string().email()
  password     → z.string().min(8)

AddressSchema
  line1        → z.string().min(1)
  line2        → z.string().optional()
  city         → z.string().min(1)
  state        → z.string().min(1)
  postalCode   → z.string().min(1)
  country      → z.string().length(2)

OrderItemSchema
  productId    → z.string().uuid()
  quantity     → z.number().int().positive()

CreateOrderSchema
  items           → z.array(OrderItemSchema).min(1)
  shippingAddress → AddressSchema

ProductSearchSchema
  query        → z.string().optional()
  category     → z.string().optional()
  minPrice     → z.number().int().nonnegative().optional()
  maxPrice     → z.number().int().positive().optional()
  inStock      → z.boolean().optional()
  limit        → z.number().int().min(1).max(100).default(20)
  offset       → z.number().int().nonnegative().default(0)
```

---

## Public API Surface (`src/index.ts`)

Everything exported from the package — consumers import from `@shopfleet/shared`, never from sub-paths.

**Types:** `User`, `UserCredentials`, `AuthToken`, `Product`, `ProductSearchParams`, `Order`, `OrderItem`, `OrderStatus`, `Address`, `Payment`, `PaymentIntent`, `PaymentStatus`, `Notification`, `NotificationEvent`, `NotificationType`

**Schemas:** `UserCredentialsSchema`, `AddressSchema`, `OrderItemSchema`, `CreateOrderSchema`, `ProductSearchSchema`

---

## ESM / Import Rules

The package is pure ESM with `moduleResolution: NodeNext`. All internal relative imports **must** use `.js` extensions:

```typescript
// ✓ correct
export * from './types/user.js';

// ✗ breaks at runtime
export * from './types/user';
```

Consumers reference the compiled output in `dist/` via the package name — they never import from `src/`.

---

## Build Output

`npm run build` (tsc) compiles to `dist/` with:
- `.js` files (ESM modules)
- `.d.ts` declaration files alongside each `.js`

`dist/` is not committed — it is a build artifact.
