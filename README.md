# DevLog API

A developer changelog & release notes REST API built with Express.js + TypeScript + Prisma.

## Stack
- Express.js + TypeScript
- Prisma ORM (SQLite)
- JWT Authentication
- bcryptjs

## Setup
```bash
pnpm install
pnpm dlx prisma migrate dev
pnpm dlx prisma generate
pnpm dev
```

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/health
