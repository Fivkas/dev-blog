import Link from "next/link";
import { prisma } from "../../lib/db"; 
import { deletePost } from "../actions/deletePost";
import { auth } from "@clerk/nextjs/server"; 

export const metadata = {
  title: "Latest Articles | DevBlog",
};

function stripMarkdown(text: string) {
  return text
    .replace(/#+\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/_/g, "")
    .replace(/`{1,3}/g, "")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/\n/g, " ");
}

export default async function BlogPage() {
  const { userId } = await auth();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Latest Articles</h1>
          <p className="text-gray-500 mt-2 text-lg">Thoughts, stories and ideas.</p>
        </div>
        
        {/* Create button visible to any logged-in user */}
        {userId && (
          <Link 
            href="/blog/create" 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm active:scale-95 transform"
          >
            + Write Post
          </Link>
        )}
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const plainText = stripMarkdown(post.content);
          
          // CHECK OWNERSHIP
          const isOwner = userId === post.userId;

          return (
            <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
              
              <div className={`h-2 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:h-3 transition-all duration-300`}></div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wide">
                    Article
                  </span>
                  
                  {/* Show DELETE only if user is owner */}
                  {isOwner && (
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="text-gray-300 hover:text-red-500 transition" title="Delete">
                        ✕
                      </button>
                    </form>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                  {plainText.substring(0, 120)}...
                </p>

                <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-50 mt-auto">
                  <span className="text-gray-400">
                    {post.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No posts found yet.</p>
        </div>
      )}
    </div>
  );
}