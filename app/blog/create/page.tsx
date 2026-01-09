// app/blog/create/page.tsx
import { createPost } from "../../actions/createPost";
import Link from "next/link";

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto p-10">
      <Link href="/blog" className="text-blue-600 mb-4 inline-block">← Back</Link>
      
      <h1 className="text-3xl font-bold mb-8">Write a New Post ✍️</h1>

      {/* The "magic": The action directly calls the server function! */}
      <form action={createPost} className="space-y-6">
        
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="e.g. Learning Next.js"
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-black"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={6}
            placeholder="Write your article here..."
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-black"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
