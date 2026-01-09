// app/actions/createPost.ts
'use server' // <--- THE MAGIC COMMAND: This code runs ONLY on the Server

import { prisma } from "../../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function createPost(formData: FormData) {

  const { userId } = await auth();

  // If not connected, throw an error
  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  // 1. We get the data from the form
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // 2. We create the slug automatically from the title
  // e.g. "Hello World" -> "hello-world"
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  // 3. Save to database
  await prisma.post.create({
    data: {
      title,
      content,
      slug,
      userId,
    },
  });

  // 4. Cache Update (to make the new article appear immediately in the list)
  revalidatePath("/blog");

  // 5. Επιστροφή στη σελίδα του Blog
  redirect("/blog");
}
