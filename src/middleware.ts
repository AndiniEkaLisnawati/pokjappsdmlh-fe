import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  role?: string
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  try {
    const decoded: DecodedToken = jwtDecode(token)

    if (decoded.role?.toLowerCase() !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard'],
}
