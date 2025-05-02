import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const usernameCookie = request.cookies.get('@codeleap:token');

  if (usernameCookie && request.nextUrl.pathname === '/signUp') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!usernameCookie && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/signUp', request.url));
  }

  const validRoutes = ['/', '/signUp'];
  if (!validRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signUp'],
};
