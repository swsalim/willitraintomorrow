import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

/**
 * Lightweight middleware: persist temperature unit cookie only.
 * Homepage location is handled by saved localStorage / explicit search,
 * not silent edge-geo injection.
 */
export async function middleware(req: NextRequest) {
  const temperature = req.cookies.get('tempScale')?.value
  const response = NextResponse.next()
  if (!temperature) {
    response.cookies.set('tempScale', 'C')
  }
  return response
}
