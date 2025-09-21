import { Header } from '@/components/Header'
import { authOptions } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <main>
      <Header />
      <ProfileClient />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Perfil',
    description: 'Gerencie as informações do seu perfil'
  }
}
