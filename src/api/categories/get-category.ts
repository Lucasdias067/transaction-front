import { api } from '@/lib/axios'

type CategoryType = 'INCOME' | 'EXPENSE'

interface CategoryProps {
  id: string
  name: string
  type: CategoryType
  userId?: string
}

export interface CategoryResponse {
  data: CategoryProps[]
  meta: {
    currentPage: number
    perPage: number
    total: number
  }
}

export async function getCategory() {
  const response = await api.get<CategoryResponse>('/categories')
  return response.data
}
