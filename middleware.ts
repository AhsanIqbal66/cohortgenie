import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/varify-code",
  "/forgot-password",
  "/2fa",
];
const PROTECTED_PATHS = ["/dashboard", "/admin", "/integration"];

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("token")?.value;
  const role = cookies.get("role")?.value;
  const path = request.nextUrl.pathname;

  const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p));
  const isProtected = PROTECTED_PATHS.some((p) => path.startsWith(p));

  // Root path redirect
  if (path === "/") {
    if (token) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard/home", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // /dashboard exact path redirect (prevent loop)
  if (path === "/dashboard" || path === "/dashboard/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard/home", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User tries to access protected route without login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged-in user trying to access a public page
  if (isPublic && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  // Admin accessing user dashboard (redirect to admin)
  if (token && role === "admin" && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Regular user accessing admin routes
  if (token && role !== "admin" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  // Allow valid requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/varify-code",
    "/forgot-password",
    "/2fa",
    "/integration",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
