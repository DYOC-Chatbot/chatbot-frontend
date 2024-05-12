import { getCurrentUser } from "@/api/auth";
import { NextRequest, NextResponse } from "next/server";

const routesWithoutAuth = ["/login", "/signup"];

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

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  const loggedIn = !!user;
  if (loggedIn && routesWithoutAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!loggedIn && !routesWithoutAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
