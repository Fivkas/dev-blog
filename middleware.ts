// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// We define which routes need protection
// We protect the create and all edit pages
const isProtectedRoute = createRouteMatcher([
  '/blog/create(.*)',
  '/blog/(.*)/edit(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // If the page is protected, require login
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
