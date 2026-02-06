# Alireza Portfolio

A multilingual portfolio built with Next.js (App Router) and MongoDB Atlas. Includes a protected admin dashboard to manage projects, experience, honors, education, and biography content.

## Features

- Next.js frontend + backend (server actions)
- MongoDB Atlas (serverless-friendly)
- Admin dashboard with single-user authentication
- Language switcher: English, Persian, Turkish, Arabic
- Theme switcher (light/dark)
- RTL support for Persian and Arabic

## Getting Started

Install dependencies:

```bash
npm.cmd install
```

Create your local environment file:

```bash
copy .env.local.example .env.local
```

Set these values in `.env.local`:

- `MONGODB_URI`
- `MONGODB_DB`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `JWT_SECRET`

Generate a password hash:

```bash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_PASSWORD', 10));"
```

Run the dev server:

```bash
npm.cmd run dev
```

Open http://localhost:3000

## Admin Dashboard

- Login: http://localhost:3000/admin
- Manage:
  - Projects
  - Experience
  - Honors
  - Education
  - Biography

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Create a Vercel project.
3. Add the same environment variables in Vercel.
4. Ensure MongoDB Atlas allows Vercel IP access.

## Content Model

Content is stored in MongoDB with localized fields (`en`, `fa`, `tr`, `ar`). The public site falls back to English if a translation is missing.
