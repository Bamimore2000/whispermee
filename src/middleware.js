import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  USERNAME_ROUTE,
  ANONYMOUS_ROUTE,
} from "./utils/routes";
export const middleware = async (req) => {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const isLoggedIn = !!session;
  const { nextUrl } = req;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isUserNameRoute = nextUrl.pathname.startsWith(USERNAME_ROUTE);
  const hasUsername = session?.user?.username;
  const anonymousRoute = nextUrl.pathname.startsWith(ANONYMOUS_ROUTE);
  console.log(hasUsername);
  console.log("route:", nextUrl.pathname, isPublicRoute);
  if (isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute && !anonymousRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (isUserNameRoute && hasUsername) {
    console.log("username route");
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
};

// middleware.ts or middleware.js

export const config = {
  matcher: [
    // Exclude static assets, including those in the public folder,
    // but include specific image paths
    "/((?!api|_next/static|_next/image|favicon.ico|anonymous.webp|mobile-mask.webp|desktop-bg.webp|mobile-bg.webp|username.webp|username-mobile-2.webp|landing-mobile.webp|landing-pc.webp|bottom-design.webp|dayo.webp|sogo.webp).*)",
  ],
};
