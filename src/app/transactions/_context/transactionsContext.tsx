import { getCategory } from '@/api/categories/get-category'
import { getTransaction } from '@/api/transactions/get-transaction'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { parseAsIsoDate, parseAsString, useQueryState } from 'nuqs'
import { ReactNode, createContext, useContext } from 'react'

function useTransactions() {
  const { data } = useSession()

  const [date, setDate] = useQueryState(
    'date',
    parseAsIsoDate.withDefault(new Date())
  )
  const [page, setPage] = useQueryState('page', parseAsString.withDefault('1'))
  const [perPage, setPerPage] = useQueryState(
    'perPage',
    parseAsString.withDefault('5')
  )

  const dateString = date?.toISOString()?.split('T')[0]

  const transactionsQuery = useQuery({
    queryKey: ['transactions', { date: dateString, page, perPage }],
    queryFn: () => {
      return getTransaction({
        date: dateString,
        page,
        per_page: perPage
      })
    },
    enabled: !!data?.user.accessToken
  })

  const { data: CategoriesResults } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
    enabled: !!data?.user.accessToken
  })

  return {
    date,
    setDate,
    page,
    setPage,
    perPage,
    setPerPage,
    transactionsResults: transactionsQuery.data,
    CategoriesResults
  }
}

type TransactionsContextType = ReturnType<typeof useTransactions>

const TransactionsContext = createContext<TransactionsContextType | null>(null)

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const transactions = useTransactions()

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext)

  if (!context) {
    throw new Error(
      'useTransactionsContext must be used within a TransactionsProvider'
    )
  }

  return context
}
