# 04 — Prisma Standards

## Rules
- Never duplicate relations
- Add indexes for searchable fields
- Use explicit relation names when needed
- Prefer enums for statuses
- Use transactions for multi-step writes

## Avoid
- N+1 queries
- unnecessary includes
- database calls inside loops
- unsafe raw SQL unless reviewed
