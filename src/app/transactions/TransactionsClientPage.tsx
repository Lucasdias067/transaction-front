'use client'

import { SumaryCards } from './_components/Sumary'
import { TransactionsTable } from './_components/TransactionsTable'
import { TransactionsProvider } from './_context/transactionsContext'

export default function TransactionsClientPage() {
  return (
    <TransactionsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
        <SumaryCards />
        <TransactionsTable />
      </div>
    </TransactionsProvider>
  )
}
