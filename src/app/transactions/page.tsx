'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { SumaryCards } from './_components/Sumary'
import { TransactionsTable } from './_components/TransactionsTable'
import { TransactionsProvider } from './_context/transactionsContext'

export default function TransactionsPage() {
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-32 bg-slate-700/30 backdrop-blur-sm rounded-xl animate-pulse border border-slate-600/30" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/sign-in')
  }

  return (
    <TransactionsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
        <SumaryCards />
        <TransactionsTable />
      </div>
    </TransactionsProvider>
  )
}
