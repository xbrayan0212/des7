import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas protegidas
const protectedPaths = ['/dashboard', '/profile', '/app']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Si la ruta es protegida
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    // Leer cookie llamada 'token' (o la que uses)
    const token = req.cookies.get('token')?.value

    if (!token) {
      // Redirigir a login si no hay token
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

// Se aplica en estas rutas (o pon '/' para todas)
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/app/:path*'],
}
