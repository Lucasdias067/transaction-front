import { api } from '@/lib/axios'

interface SignUpBody {
  name: string
  email: string
  password: string
}

export async function SignUpUser(data: SignUpBody) {
  const response = await api.post('/auth/sign-up', {
    name: data.name,
    email: data.email,
    password: data.password,
    role: 'USER'
  })
  return response.data
}
