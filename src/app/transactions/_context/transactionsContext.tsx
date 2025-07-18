import { getTransactions } from '@/api/transactions/get-transactions'
import { useQuery } from '@tanstack/react-query'
import { parseAsString, useQueryState } from 'nuqs'
import { ReactNode, createContext, useContext } from 'react'

function useTransactions() {
  const [date, setDate] = useQueryState('date', parseAsString)
  const [page, setPage] = useQueryState('page', parseAsString.withDefault('1'))
  const [perPage, setPerPage] = useQueryState(
    'perPage',
    parseAsString.withDefault('10')
  )

  const { data: transactionsResults } = useQuery({
    queryKey: ['transactions', { date, page, perPage }], 
    queryFn: () =>
      getTransactions({
        date,
        page,
        per_page: perPage
      })
  })

  return {
    date,
    setDate,
    page,
    setPage,
    perPage,
    setPerPage,
    transactionsResults
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
