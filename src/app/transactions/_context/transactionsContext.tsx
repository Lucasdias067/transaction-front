import { TransactionsResponse, getTransactions } from '@/api/transactions/get-transactions'
import { useQuery } from '@tanstack/react-query'
import { Options, parseAsString, useQueryState } from 'nuqs'
import { createContext, useContext } from 'react'

type Children = { children: React.ReactNode }

interface TransactionsData {
  date: string | null
  setDate: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>
  page: string | null
  setPage: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>
  perPage: string | null
  setPerPage: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>
  transactionsResults: TransactionsResponse | undefined
}

const TransactionsContext = createContext({} as TransactionsData)

export function TransactionsProvider({ children }: Children) {
  const [date, setDate] = useQueryState('date', parseAsString)
  const [page, setPage] = useQueryState('page', parseAsString.withDefault('1'))
  const [perPage, setPerPage] = useQueryState(
    'perPage',
    parseAsString.withDefault('10')
  )

  const { data: transactionsResults } = useQuery({
    queryKey: ['transactions', { date, page, per_page: perPage }],
    queryFn: () =>
      getTransactions({
        date,
        page,
        per_page: perPage
      })
  })

  return (
    <TransactionsContext.Provider
      value={{
        date,
        setDate,
        page,
        setPage,
        perPage,
        setPerPage,
        transactionsResults
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext)

  return context
}
