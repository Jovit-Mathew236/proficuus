import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie"; // Use the cookie package to parse cookies

export function middleware(request: NextRequest) {
  const cookies = request.headers.get("cookie");
  const parsedCookies = cookies ? parse(cookies) : {};
  const userEmail = parsedCookies.user_email;

  // Redirect non-admin users from /dashboard to /profile
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    userEmail !== "admin@jymest.com"
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Redirect admin users from /profile to /dashboard
  if (
    request.nextUrl.pathname.startsWith("/profile") &&
    userEmail === "admin@jymest.com"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();

  // Set cache control headers to prevent any caching
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  response.headers.set(
    "Vercel-CDN-Cache-Control",
    "no-store, max-age=0, must-revalidate"
  );

  return response;
}
