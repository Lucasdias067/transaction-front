import { Header } from '@/components/Header'
import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import TransactionsClient from './TransactionsClient'

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <main>
      <Header />
      <TransactionsClient />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Transações',
    description: 'Gerencie suas transações financeiras'
  }
}
