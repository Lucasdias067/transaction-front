import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use(async config => {
  const session = await getSession()

  const token = session?.user.accessToken

  if (typeof token === 'string') {
    config.headers.Authorization = token
  }

  return config
})

// Interceptor de resposta para detectar tokens expirados
api.interceptors.response.use(
  response => response,
  async error => {
    // Verifica se é 401 e se há uma sessão ativa
    if (error.response?.status === 401) {
      const session = await getSession()

      // Só força logout se:
      // 1. Havia uma sessão ativa (usuário estava logado)
      // 2. E a resposta indica sessão expirada
      if (
        session &&
        (error.response?.data?.message ===
          'Your session has expired, please log in again.' ||
          error.response?.data?.error === 'Unauthorized' ||
          error.response?.data?.message?.includes('session has expired') ||
          error.response?.data?.message?.includes('please log in again'))
      ) {
        // Força o logout no frontend
        await signOut({ callbackUrl: '/sign-in' })
      }
    }
    return Promise.reject(error)
  }
)
