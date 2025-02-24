import createMiddleware from 'next-intl/middleware';
import { updateSession } from "./app/config/authMiddlware";
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return await updateSession(request);
  } else if (request.nextUrl.pathname.startsWith('/')) {
    return intlMiddleware(request);
  }
  return NextResponse.next()
}


export const config = {
  matcher:  ['/', '/(fr|en|ko|ja)/:path*', "/admin/dashboard/:path*"],
};
