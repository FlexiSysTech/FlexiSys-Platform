# 01 — Architecture

FlexiSys uses enterprise modular architecture.

## Stack
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger
- RBAC
- pnpm Workspace

## Principles
- Modular first
- Thin controllers
- Business logic in services
- DTO validation
- Prisma transactions for multi-step writes
- Auditability for critical actions
- Backward compatibility

## Module Structure
```text
src/module/
  module.module.ts
  feature/
    dto/
    entities/
    feature.controller.ts
    feature.service.ts
    feature.module.ts
```
