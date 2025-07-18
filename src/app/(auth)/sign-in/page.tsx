'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle, CircleCheck, CircleX, Lock, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      setIsLoading(false)

      if (result?.ok === false) {
        toast.error('Falha no login', {
          description: 'Credenciais inválidas. Verifique seu e-mail e senha.',
          icon: <CircleX className="h-5 w-5" />
        })
        return
      }

      toast.success('Login bem-sucedido!', {
        description: 'Redirecionando para a sua página...',
        icon: <CircleCheck className="h-5 w-5" />
      })

      await new Promise(resolve => setTimeout(resolve, 500))
      router.push('/transactions')
    } catch (error) {
      setIsLoading(false)
      console.error('Falha inesperada no login:', error)
      toast.error('Ocorreu um erro inesperado.', {
        description: 'Por favor, tente novamente mais tarde.',
        icon: <AlertTriangle className="h-5 w-5" />
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Acesse sua Conta</h2>
            <p className="text-slate-400 text-sm mt-2">
              Bem-vindo de volta! Insira seus dados para continuar.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="bg-slate-900/50 border-slate-700 rounded-lg pl-10 focus:ring-emerald-500 focus:border-emerald-500"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Senha
              </Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-slate-900/50 border-slate-700 rounded-lg pl-10 focus:ring-emerald-500 focus:border-emerald-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-br cursor-pointer from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 text-white text-base font-semibold hover:border-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Não tem uma conta?{' '}
              <Link
                href="/sign-up"
                className="font-medium text-emerald-400 hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast:
              'group toast bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 shadow-2xl',
            title: 'text-white font-semibold',
            description: 'text-slate-400',
            actionButton:
              'group-[.toast]:bg-emerald-500 group-[.toast]:text-white',
            cancelButton:
              'group-[.toast]:bg-slate-700 group-[.toast]:text-slate-300',
            error: 'group toast border-red-500/50 text-red-400',
            success: 'group toast border-emerald-500/50 text-emerald-400',
            warning: 'group toast border-yellow-500/50 text-yellow-400',
            info: 'group toast border-blue-500/50 text-blue-400'
          }
        }}
      />
    </div>
  )
}
