import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
    publicRoutes: [
        "/",
        "/property/[id]",
        "/sign-in/",
        "/api/properties",
    ],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};