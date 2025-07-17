import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === '/login';

  // Redirect to login if not authenticated and not already on login page
  if (!isAuth && !isLoginPage) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent authenticated users from accessing login page
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Only run middleware on these routes
export const config = {
  matcher: [
    '/',              // protect homepage
    '/learn/:path*',  // protect learning pages
    '/dashboard', '/login'     // optional: protect user dashboard
  ],
};
