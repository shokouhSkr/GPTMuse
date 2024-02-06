import { authMiddleware } from "@clerk/nextjs";

// It means users "only have access to home page", and others in matcher are forbidden until we login
export default authMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
