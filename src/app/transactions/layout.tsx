import type { Metadata } from 'next'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Transações',
  description: 'Gerencie suas transações financeiras'
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}
