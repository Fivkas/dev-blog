// app/actions/updatePost.ts
'use server'

import { prisma } from "../../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function updatePost(formData: FormData) {
  const { userId } = await auth();

  // Check if user is authenticated
  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;

  // 1. Fetch the existing post to check ownership
  const post = await prisma.post.findUnique({
    where: { id },
  });

  // 2. Check if post exists and if the current user is the owner
  if (!post || post.userId !== userId) {
    throw new Error("Unauthorized: You are not the owner of this post");
  }

  // 3. Update database
  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
    },
  });

  // Refresh the article page to see the change
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog");

  // Return to article
  redirect(`/blog/${slug}`);
}