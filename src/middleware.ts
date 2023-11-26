
import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { ROLE } from './types/role';

const middleware = (request: NextRequestWithAuth) => {
    
    if (!request.nextauth?.token?.role) {
        return NextResponse.rewrite(new URL('/auth/login', request.url));
    }

   
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/admin') && request.nextauth?.token?.role === ROLE.ADMIN) {
        return NextResponse.rewrite(new URL('/auth/denied', request.url));
    }
}
const callbackOptions: NextAuthMiddlewareOptions = {};
export default withAuth(middleware, callbackOptions)
export const config = {
    matcher: ['/projects','/projects/:path*','/users','/users/:path*','/admin','/admin/:path*','/reports','/reports/:path*'],
}
