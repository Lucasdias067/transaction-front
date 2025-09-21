'use client'

import { TransactionsProvider } from '@/context/transactionsContext'
import { SummaryCards } from '@/features/transactions/Summary'
import { TransactionsTable } from '@/features/transactions/transactionsTable'

export default function TransactionsClient() {
  return (
    <TransactionsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
        <SummaryCards />
        <TransactionsTable />
      </div>
    </TransactionsProvider>
  )
}
