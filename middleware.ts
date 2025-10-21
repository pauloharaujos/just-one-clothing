import NextAuth from "next-auth";
import { NextResponse } from 'next/server';
import authConfig from "./auth.config";

const protectedPaths = ['/orders', '/customer/account', '/checkout', '/cart'];
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    const isProtectedPath = protectedPaths.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedPath && !isLoggedIn) {
        const newUrl = new URL("/customer/login", req.nextUrl.origin);
        return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}