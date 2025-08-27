import { Metadata } from 'next'
import { SignInForm } from './SignInForm'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Entrar',
    description:
      'Faça login na sua conta para acessar suas transações e finanças.'
  }
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <SignInForm />
    </div>
  )
}
