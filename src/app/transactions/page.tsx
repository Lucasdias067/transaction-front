'use client'
import React from 'react'
import { Sumary } from './_components/Sumary'
import { TransactionsTable } from './_components/TransactionsTable'

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
      <Sumary />
      <TransactionsTable />
    </div>
  )
}
