import { NextResponse } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/session";

// Every page needs a valid login cookie, except the login page itself.
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const loggedIn = await verifySession(
    request.cookies.get(COOKIE_NAME)?.value,
    process.env.SESSION_SECRET
  );

  if (pathname === "/login") {
    return loggedIn ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
  }
  if (!loggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
