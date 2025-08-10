import { api } from '@/lib/axios'

export interface TransactionsQuery {
  page?: string | null
  per_page?: string | null
  date?: string | null
}

interface TransactionProps {
  id: string
  title: string
  amount: number
  type: TransactionType
  userId: string
  categoryId: string
  categoryName: string
  status: TransactionStatus
  installmentNumber?: number
  totalInstallments?: number
  installmentGroupId?: string
  dueDate?: Date
  paidAt?: Date
  effectiveDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface TransactionsResponse {
  data: TransactionProps[]
  meta: {
    currentPage: number
    perPage: number
    total: number
  }
}

export async function getTransaction({
  date,
  page,
  per_page
}: TransactionsQuery) {
  const response = await api.get<TransactionsResponse>('/transactions', {
    params: {
      date,
      page,
      per_page
    }
  })

  return response.data
}
