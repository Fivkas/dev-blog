# DevBlog 🚀

A modern, secure, full-stack blog application built with **Next.js 16**, **Server Actions**, **PostgreSQL**, and **Clerk Authentication**.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://dev-blog-fivkas.vercel.app/)

## 🌟 Live Demo

Check out the live application here: **[https://dev-blog-fivkas.vercel.app/](https://dev-blog-fivkas.vercel.app/)**

## ✨ Features

- **Full Stack CRUD:** Create, read, edit, and delete posts directly from the UI.
- **🔐 Secure Authentication:** Integrated with **Clerk** for user management.
- **🛡️ Authorization & Ownership:** Users can only edit or delete **their own** posts.
- **Server Actions:** Mutations handling directly on the server (no separate API endpoints).
- **Database Integration:** PostgreSQL with Prisma ORM.
- **Markdown Support:** Write posts in Markdown with rich formatting.
- **Modern UI:** Responsive design with Tailwind CSS, CSS Grid, and beautiful cards.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Deployment:** Vercel
- **Database:** PostgreSQL (Neon DB for Prod / Docker for Local)
- **Auth:** Clerk
- **ORM:** Prisma
- **Styling:** Tailwind CSS + @tailwindcss/typography

## 🚀 Getting Started Locally

If you want to run this project on your machine:

### 1. Clone the repository
```bash
git clone [https://github.com/Fivkas/dev-blog.git](https://github.com/Fivkas/dev-blog.git)
cd dev-blog
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory. You will need a **Clerk** account and a **PostgreSQL** database (Local via Docker or Cloud via Neon).

```env
# Database Connection (Docker or Neon)
DATABASE_URL="postgresql://user:password@localhost:5432/devblog?schema=public"

# Clerk Authentication Keys (Get these from dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Start the Database (If using Docker)
Ensure you have Docker Desktop installed and running.

```bash
docker-compose up -d
```

### 5. Run Migrations
Push the database schema to your local Postgres instance.

```bash
npx prisma migrate dev --name init
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000/blog](http://localhost:3000/blog) with your browser.

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/app/actions`: Server Actions for database mutations (Create, Update, Delete).
- `/prisma`: Database schema.
- `/lib`: Shared utilities (Prisma client).
- `/components`: Reusable UI components.
- `middleware.ts`: Clerk authentication middleware for route protection.

<img width="1434" height="676" alt="Screenshot 2026-01-09 at 4 30 07 PM" src="https://github.com/user-attachments/assets/ab7a6c8a-e162-4f09-8b07-484f6112c693" />
<img width="1433" height="672" alt="Screenshot 2026-01-09 at 4 30 30 PM" src="https://github.com/user-attachments/assets/64cb87c8-74b8-4d7b-b656-dfee9a1ad6b8" />
