// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DevBlog",
  description: "Learn more about the team behind DevBlog.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">About DevBlog</h1>
      <p className="text-gray-700 text-lg leading-relaxed">
        Welcome to DevBlog! We are passionate developers sharing our knowledge
        about Next.js, React, and modern web development.
      </p>
    </div>
  );
}
