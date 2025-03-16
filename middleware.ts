import { NextRequest, NextResponse } from "next/server";

// Middleware to redirect users who are already logged in to the home page
export function middleware(req: NextRequest) {
  const token = req.headers.get("token");

  if (token) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home
  }

  return NextResponse.next(); // Allow access to login/register pages
}

// Apply only to login & register pages
export const config = {
  matcher: ["/login", "/register"],
};
