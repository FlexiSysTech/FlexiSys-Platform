# 03 — Development Standards

## Rules
- Keep code readable
- Avoid duplication
- Never hardcode secrets
- Use meaningful names
- Keep repository buildable

## Required Commands
After Prisma changes:
```bash
npx prisma format
npx prisma validate
npx prisma generate
```
After implementation:
```bash
npm run build
```
