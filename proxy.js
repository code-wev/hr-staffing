import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 🔥 The proxy function
export const proxy = withAuth(
  function proxy(req) {
    const { nextUrl } = req;
    const token = req.nextauth.token;
    const pathname = nextUrl.pathname;

    // --- ROLE PROTECTION ---

    if (pathname.startsWith("/client")) {
      if (token?.role !== "client") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (pathname.startsWith("/applicant")) {
      if (token?.role !== "applicant") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// 🔥 Correct matcher (no "/" and no /auth/*)
export const config = {
  matcher: [
    "/dashboard/:path*",  
    "/client/:path*",
    "/applicant/:path*",
    "/admin/:path*",
    "/agents/:path*",
    "/carriers/:path*",
    "/payments/:path*",
    "/statements/:path*",
    "/bonous/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/logs/:path*",
  ],
};
