import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export default async function middleware(req: NextRequest) {
  const session = cookies().get('session');

  // Verificar si hay sesión
  if (session) {
    try {
      // Verificar el JWT
      await jwtVerify(
        session.value,
        new TextEncoder().encode('S3cr3tK3YJwTt0k3n@s1@yth3r_Z@m0ra>!@$')
      );

      // Si la sesión es válida y el usuario intenta acceder a las páginas de login o registro
      const authRoutes = ['/login', '/register'];
      if (authRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(
          new URL('/dashboard/work-orders', req.url)
        );
      }

      // Si la sesión es válida, permite el acceso a las rutas del dashboard
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error('Error de verificación del token:', error);
      return NextResponse.redirect('/login');
    }
  } else {
    // Si no hay sesión y se intenta acceder a rutas protegidas
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Permite el acceso a otras rutas no protegidas
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
