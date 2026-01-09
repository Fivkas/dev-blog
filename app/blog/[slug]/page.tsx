import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/db"; 
import ReactMarkdown from "react-markdown";
import { auth } from "@clerk/nextjs/server"; 

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | DevBlog`,
    description: post.content.substring(0, 100),
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const { userId } = await auth();

  const post = await prisma.post.findUnique({
    where: { slug }
  });

  if (!post) notFound();

  // CHECK OWNERSHIP
  const isOwner = userId === post.userId;

  return (
    <div className="max-w-3xl mx-auto p-10">
      <Link href="/blog" className="text-blue-600 mb-4 inline-block font-medium hover:underline">← Back to Blog</Link>
      
      <article>
        <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          
          {/* Show EDIT only if user is owner */}
          {isOwner && (
            <Link 
              href={`/blog/${post.slug}/edit`}
              className="flex-shrink-0 bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 text-sm font-medium border ml-4 transition"
            >
              ✎ Edit
            </Link>
          )}
        </div>

        <div className="text-gray-400 text-sm mb-8">
          Published on: {post.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        <div className="prose lg:prose-xl prose-slate max-w-none text-gray-700">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}