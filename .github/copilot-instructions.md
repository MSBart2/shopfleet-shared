# Copilot Instructions — shopfleet-shared

## What this repo is

`@shopfleet/shared` is a **TypeScript library** — the single source of truth for types, Zod validation schemas, and shared enumerations used by all ShopFleet microservices. It has no runtime dependencies other than Zod.

For the full technical reference (type contracts, schema constraints, source layout, ESM rules, build output, and consumer boundaries) see **[architecture.md](../architecture.md)**.

## Commands

```bash
npm run build      # Compile TypeScript → dist/ (tsc)
npm test           # Run all tests (vitest run)
npm run lint       # Lint src/ (eslint)
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.ts
```

## Key conventions

- Monetary values are **integers in cents** — never floats or dollars.
- Dates are **ISO 8601 strings** — never `Date` objects.
- Status fields use **string union literals** — never TypeScript `enum`.
- All Zod schemas live in `src/schemas/index.ts` — not alongside type files.
- Schemas validate **input** shapes only — no `id` or timestamps.
- Internal imports require **`.js` extensions** (ESM/NodeNext).
- Consumers import from `@shopfleet/shared` only — never from sub-paths or `src/`.
