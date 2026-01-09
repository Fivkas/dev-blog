# DevBlog 🚀

A modern, secure, full-stack blog application built with **Next.js 16**, **Server Actions**, **PostgreSQL**, and **Clerk Authentication**.

This project demonstrates a complete CRUD (Create, Read, Update, Delete) flow using the latest Next.js features, with protected routes and a polished UI.

## ✨ Features

- **Full Stack CRUD:** Create, read, edit, and delete posts directly from the UI.
- **Secure Authentication:** Integrated with **Clerk** for user management.
- **Protected Routes:** Middleware ensures only authenticated users can modify content.
- **Server Actions:** Mutations handling directly on the server (no API endpoints).
- **Database Integration:** PostgreSQL with Prisma ORM.
- **Markdown Support:** Write posts in Markdown with rich formatting & syntax highlighting.
- **Modern UI:** Responsive design with Tailwind CSS, CSS Grid, and beautiful cards.
- **Local Development:** Docker Compose setup for the local database.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Auth:** Clerk
- **Database:** PostgreSQL (Neon for Prod / Docker for Local)
- **ORM:** Prisma
- **Styling:** Tailwind CSS + @tailwindcss/typography
- **Markdown:** react-markdown

## 🚀 Getting Started

Follow these steps to run the project locally.

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

Create a `.env` file in the root directory. You will need a **Clerk** account for the auth keys.

```env
# Connect to the local Docker database
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/devblog?schema=public"

# Clerk Authentication Keys (Get these from dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Start the Database (Docker)

Ensure you have Docker Desktop installed and running.

```bash
# Start the Postgres container
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
Try signing in to access the **Create**, **Edit**, and **Delete** features!

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/app/actions`: Server Actions for database mutations.
- `/prisma`: Database schema and migrations.
- `/lib`: Shared utilities (Prisma client singleton).
- `/components`: Reusable UI components.
- `middleware.ts`: Clerk authentication middleware for route protection.