import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Set cache control headers to prevent any caching
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  response.headers.set(
    "Vercel-CDN-Cache-Control",
    "no-store, max-age=0, must-revalidate"
  );

  return response;
}
