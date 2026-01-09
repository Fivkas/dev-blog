// app/actions/deletePost.ts
'use server'

import { prisma } from "../../lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function deletePost(formData: FormData) {

  const { userId } = await auth();

  // If not connected, throw an error
  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  // 1. We get the ID of the article we want to delete
  const postId = formData.get("id") as string;

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.userId !== userId) {
    throw new Error("Unauthorized");
  }

  // 2. We delete it from the database.
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  // 3. We tell Next.js to refresh the list to make the article disappear
  revalidatePath("/blog");
}