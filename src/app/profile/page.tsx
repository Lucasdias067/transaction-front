import { Header } from '@/components/Header'
import { authOptions } from '@/lib/auth'
import { generateText } from 'ai'
import 'dotenv/config'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  const { text } = await generateText({
    model: 'openai/gpt-5-nano',
    prompt:
      'Escreva uma breve descrição sobre gerenciamento de finanças pessoais.'
  })

  console.log('Response:', { text })

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
