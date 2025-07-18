import axios from 'axios'
import { getSession } from 'next-auth/react'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use(async config => {
  const session = await getSession()
  console.log('Sessão carregada:', session)

  const token = session?.user.accessToken
  console.log('Enviando token:', token)

  config.headers.Authorization = `Bearer ${token}`
  return config
})
