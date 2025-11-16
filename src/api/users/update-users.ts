import { api } from '@/lib/axios'
import { User } from 'next-auth'

export async function updateUser(
  id: string,
  data: Partial<User>
): Promise<User> {
  const response = await api.patch(`/users/${id}/password`, data)

  return response.data
}
