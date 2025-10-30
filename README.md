# secure-mini-api

API REST mínima y segura con Node.js + Express + PostgreSQL + Prisma, MFA (TOTP), RBAC, validaciones, headers de seguridad, Docker y CI/CD con GitHub Actions.

## 1. Requisitos
- Node.js 20+
- Docker + Docker Compose
- Git

## 2. Configuración local
```bash
cp .env.example .env
npm i
docker compose up -d db
npx prisma db push
npm run dev
```
Probar:
```bash
curl http://localhost:3000/health
```

### Crear admin por seed
```bash
npm run prisma:seed
```

## 3. Endpoints
- `GET /health`
- `POST /auth/register` `{ email, password }`
- `POST /auth/login` `{ email, password }` → `{ token }`
- `POST /auth/mfa/enable` (Bearer token)
- `POST /auth/mfa/verify` `{ token }` (Bearer token)
- `GET /users/` (solo admin)

## 4. Seguridad aplicada
- Hashing+salting (bcrypt 12).
- JWT expira 1h.
- MFA TOTP opcional.
- RBAC.
- Validaciones Joi.
- Helmet (CSP, HSTS).
- Rate limiting.

## 5. CI/CD
Workflow en `.github/workflows/ci.yml`:
- Lint, tests, `npm audit`, build, Trivy scan, deploy a entorno de pruebas por SSH + rsync.

## 6. Backups
Crontab en `backups/crontab`. Puedes montar un contenedor cron personalizado o usar tu host.

## 7. Despliegue manual (servidor pruebas)
Ver guía detallada en la entrega del chat.
