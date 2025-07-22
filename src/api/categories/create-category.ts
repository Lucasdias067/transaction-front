import { api } from '@/lib/axios'

export interface CategoryRequest {
  name: string
  type: TransactionType
}

export async function createCategory(data: CategoryRequest) {
  return await api.post('/categories', {
    name: data.name,
    type: data.type
  })
}
