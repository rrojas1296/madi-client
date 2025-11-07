import { NextRequest, NextResponse } from "next/server";
import { auth } from "./middleware/auth";

const privateRoutes: string[] = ["/dashboard", "/apartments"];
const publicRoutes: string[] = ["/login", "/register"];

const middleware = async (req: NextRequest) => {
  const { res, isAuthenticated } = await auth(req);

  const pathname = req.nextUrl.pathname;

  const isPrivate = privateRoutes.some((pr) => pathname.startsWith(pr));
  const isPublic = publicRoutes.some((pr) => pathname.startsWith(pr));

  if (isPrivate && isAuthenticated && res) {
    return res;
  }
  if (isPrivate && !isAuthenticated)
    return NextResponse.redirect(new URL("/login", req.url));

  if (isPublic && isAuthenticated)
    return NextResponse.redirect(new URL("/dashboard", req.url));
  return NextResponse.next();
};

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

export default middleware;
