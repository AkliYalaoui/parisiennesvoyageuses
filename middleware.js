import { updateSession } from "./app/config/middlware"

export async function middleware(request) {
  return await updateSession(request)
}

export const config = {
  matcher: '/admin/dashboard/:path*',
}