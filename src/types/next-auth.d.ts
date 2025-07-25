import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
      accessToken: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    role: string
    access_token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    accessToken: string
  }
}
