import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const firstSeg = request.nextUrl.pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = (routing.locales as readonly string[]).includes(firstSeg)
    ? firstSeg
    : routing.defaultLocale;
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};