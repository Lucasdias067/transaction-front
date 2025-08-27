import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Middleware logic can be added here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/sign-in',
      error: '/sign-in'
    }
  }
)

export const config = {
  matcher: ['/transactions/:path*']
}
