import { api } from '@/lib/axios'
import CredentialsProvider from 'next-auth/providers/credentials'

interface Response {
  id: string
  name: string
  email: string
  role: string
  access_token: string
}

export const authOptions = {
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
            return {
              id: data.id,
              name: data.name,
              email: data.email,
              accessToken: data.access_token
            }
          }

          return null
        } catch (error) {
          console.error('API Error in authorize:', error)
          throw new Error('As credenciais fornecidas são inválidas.')
        }
      }
    })
  ]
}
