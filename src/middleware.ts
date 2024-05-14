import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (!req.auth) {
    // /loginにredirectをする
    // すでにloginにいる場合は何もしない
    if (pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
