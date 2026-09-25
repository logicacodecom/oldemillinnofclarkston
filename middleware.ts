import { NextResponse, type NextRequest } from "next/server";

// English is served without a prefix (/room) from the internal /en segment;
// Spanish keeps its /es prefix. /en/* is redirected so English has one URL.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/es" || pathname.startsWith("/es/")) return NextResponse.next();

  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and files with an extension (images, icons, sitemap.xml).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
