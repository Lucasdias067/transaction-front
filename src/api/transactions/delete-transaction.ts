import { api } from '@/lib/axios'

export async function deleteTransaction(id: string) {
  const response = await api.delete(`/transactions/${id}`)

  return response.data
}
