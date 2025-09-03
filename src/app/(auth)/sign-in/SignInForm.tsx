'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Lock, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const schema = z.object({
  email: z.email({ message: 'Envie um email válido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' })
})

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const validation = schema.safeParse({ email, password })
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {}
      validation.error.issues.forEach(issue => {
        if (issue.path[0] === 'email') {
          fieldErrors.email = issue.message
        } else if (issue.path[0] === 'password') {
          fieldErrors.password = issue.message
        }
      })
      setErrors(fieldErrors)
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setErrors({ general: 'Email ou senha inválidos' })
        toast.error('Email ou senha inválidos')
      } else if (result?.ok) {
        toast.success('Login realizado com sucesso!')
        router.push('/transactions')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      setErrors({ general: 'Ocorreu um erro inesperado. Tente novamente.' })
      toast.error('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Acesse sua Conta</h2>
          <p className="text-slate-400 text-sm mt-2">
            Bem-vindo de volta! Insira seus dados para continuar.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                className="bg-slate-900/50 border-slate-700 rounded-lg pl-10 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Senha
            </Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-5 w-5 text-slate-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="bg-slate-900/50 border-slate-700 rounded-lg pl-10 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/20">
              <AlertTriangle className="h-4 w-4" />
              <p>{errors.general}</p>
            </div>
          )}

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
  )
}
