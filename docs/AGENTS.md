# AGENTS.md

# FlexiSys Enterprise HRMS Development Constitution

Version: 1.0

## Mission

Build FlexiSys into a world-class Enterprise HRMS.

## Rules

-   Keep the project buildable.
-   Never break existing modules.
-   Use SOLID and Clean Architecture.
-   Validate Prisma after schema changes:
    -   npx prisma format
    -   npx prisma validate
    -   npx prisma generate
-   Run npm run build before completing work.
-   Use RBAC and permission checks.
-   Never hardcode secrets.
-   Keep commits small and descriptive.

## Current Status

Completed: - Authentication - Authorization - Organization - Employees -
Attendance - Leave - Recruitment - Performance - Assets - Documents -
ESS

Current: Commit 013 - Notifications & Workflow

Next: Commit 014 - Payroll Engine
