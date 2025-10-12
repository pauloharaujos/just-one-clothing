import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt"

const protectedPaths = ['/orders', '/customer/account', '/checkout'];

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })
    const { pathname } = request.nextUrl

    const isProtectedPath = protectedPaths.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL("/customer/login", request.url));
    }

    return NextResponse.next();
}