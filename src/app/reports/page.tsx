import { Header } from '@/components/Header'
import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ReportsClient from './ReportsClient'

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <main>
      <Header />
      <ReportsClient />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Relatórios',
    description: 'Visualize relatórios e análises das suas finanças'
  }
}
