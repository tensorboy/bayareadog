import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Let verification bots access root path without redirect
  if (request.nextUrl.pathname === "/") {
    const ua = request.headers.get("user-agent") || "";
    // Impact and other verification bots
    if (ua.includes("Impact") || ua.includes("bot") || ua.includes("crawler") || ua.includes("spider")) {
      return NextResponse.rewrite(new URL("/en", request.url));
    }
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(zh|en|es|ja|ko)/:path*"],
};
