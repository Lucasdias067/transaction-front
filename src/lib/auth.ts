import { api } from '@/lib/axios'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface Response {
  id: string
  name: string
  email: string
  role: string
  access_token: string
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const response = await api.post<Response>('/auth/sign-in', {
            email: credentials.email,
            password: credentials.password
          })

          const data = response.data

          if (data && data.access_token) {
            return data
          }

          return null
        } catch (error) {
          console.error('API Error in authorize:', error)
          throw new Error('As credenciais fornecidas são inválidas.')
        }
      }
    })
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.accessToken = user.access_token
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.accessToken = token.accessToken as string
      }

      return session
    }
  }
}
