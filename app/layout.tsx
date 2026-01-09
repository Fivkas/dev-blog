import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevBlog",
  description: "Built with Next.js & Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. We wrap the entire application with ClerkProvider
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
          
          {/* --- NAVBAR --- */}
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
            <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="font-bold text-2xl tracking-tight text-blue-600">
                Dev<span className="text-gray-900">Blog.</span>
              </Link>
              
              {/* Menu & Auth */}
              <div className="flex gap-6 items-center text-sm font-medium text-gray-600">
                <Link href="/blog" className="hover:text-blue-600 transition">Articles</Link>
                
                {/* If you are NOT logged in -> Show Sign In button */}
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>

                {/* If you ARE logged in -> Show user icon */}
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </nav>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-grow">
            {children}
          </main>

          {/* --- FOOTER --- */}
          <footer className="bg-white border-t border-gray-200 py-8 mt-12">
            <div className="max-w-5xl mx-auto px-6 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} DevBlog. Built with Next.js, Tailwind & Prisma.</p>
            </div>
          </footer>
          
        </body>
      </html>
    </ClerkProvider>
  );
}