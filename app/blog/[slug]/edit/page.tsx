import { prisma } from "../../../../lib/db"; 
import { updatePost } from "../../../actions/updatePost";
import { notFound, redirect } from "next/navigation"; // Add redirect
import Link from "next/link";
import { auth } from "@clerk/nextjs/server"; // Add auth

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditPage({ params }: Props) {
  const { slug } = await params;
  const { userId } = await auth(); // Get current user

  // 1. Find the post
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  // 2. SECURITY CHECK: If user is NOT the owner, kick them out
  if (post.userId !== userId) {
    redirect("/blog"); // Or show an error page
  }

  return (
    <div className="max-w-2xl mx-auto p-10">
      <div className="mb-8">
        <Link href={`/blog/${slug}`} className="text-blue-600">← Cancel</Link>
        <h1 className="text-3xl font-bold mt-2">Edit Post ✏️</h1>
      </div>

      <form action={updatePost} className="space-y-6">
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="slug" value={post.slug} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 bg-white text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
          <textarea
            name="content"
            defaultValue={post.content}
            rows={10}
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 bg-white text-black font-mono text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}