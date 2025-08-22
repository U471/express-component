# Express + MongoDB Starter (JWT, Reusable Error Handling, Logging)

## Features
- Standard layered structure (routes → controllers → services → models)
- MongoDB via Mongoose
- JWT auth (signup/login) + protected dashboard route
- Forgot/reset password flow (token stored in DB; email mocked if SMTP missing)
- Centralized, reusable error handling (`AppError`, `errorHandler`)
- Structured logging with Winston (console + `logs/app.log`)
- Validation with Joi
- Security middlewares (helmet, cors, rate limiting)
- Health check at `/health`

## Endpoints
- `POST /api/v1/auth/signup` `{ name, email, password }`
- `POST /api/v1/auth/login` `{ email, password }`
- `POST /api/v1/auth/forgot` `{ email }`
- `POST /api/v1/auth/reset` `{ token, newPassword }`
- `GET  /api/v1/dashboard` (requires `Authorization: Bearer <JWT>`)

## Quick Start
1. Copy `.env.example` to `.env` and set values.
2. Install deps: `npm install`
3. Run server: `npm run dev` (or `npm start`)
4. Test with Postman/Thunder:
   - Signup → Login → copy token
   - Call `/api/v1/dashboard` with header `Authorization: Bearer <token>`

**Note:** If SMTP env vars are not set, password reset emails are logged to console instead of being sent.

Route (/auth/signup)
   ↓
Controller (auth.controller.js → signup)
   ↓
Validation (auth.validation.js)
   ↓
Service (auth.service.js → signup logic)
   ↓
Model (User.js → save user)
   ↓
Utils (generateToken.js → JWT)
   ↓
Response back to Controller
   ↓
Client
