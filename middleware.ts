import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

const protectedPaths = ['/orders'];

export async function middleware(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl

    const isProtectedPath = protectedPaths.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedPath && !session) {
        return NextResponse.redirect(new URL("/customer/account/login", request.url));
    }

    return NextResponse.next();
}