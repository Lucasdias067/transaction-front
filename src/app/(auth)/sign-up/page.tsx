import { Metadata } from 'next'
import SignUpForm from './SignUpForm'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Criar Conta',
    description: 'Cadastre-se para acessar suas transações e finanças.'
  }
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <SignUpForm />
    </div>
  )
}
