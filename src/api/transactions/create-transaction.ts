import { api } from '@/lib/axios'

export interface TransactionRequest {
  title: string
  amount: number
  type: TransactionType
  categoryId: string
  status: TransactionStatus
  installmentNumber?: number
  totalInstallments?: number
  dueDate?: Date
  paidAt?: Date
  EffectiveDate: Date
}

export async function createTransaction(data: TransactionRequest) {
 return await api.post('/transactions', {
    title: data.title,
    amount: data.amount,
    type: data.type,
    categoryId: data.categoryId,
    status: data.status,
    installmentNumber: data.installmentNumber,
    totalInstallments: data.totalInstallments,
    dueDate: data.dueDate?.toISOString(),
    paidAt: data.paidAt?.toISOString(),
    EffectiveDate: data.EffectiveDate.toISOString()
  })
}
