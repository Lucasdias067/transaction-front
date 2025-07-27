'use client'

import { SignUpUser } from '@/api/auth/sign-up-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Lock, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  email: z.email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().refine(
    password => {
      const hasUpperCase = /[A-Z]/.test(password)
      const hasLowerCase = /[a-z]/.test(password)
      const hasNumber = /\d/.test(password)
      const hasSymbol = /[^A-Za-z0-9]/.test(password)

      return (
        password.length >= 8 &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSymbol
      )
    },
    {
      message:
        'Senha deve conter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo'
    }
  )
})

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: SignUpUser,
    onSuccess: () => {
      toast.success('Conta criada com sucesso!', {
        description: 'Você será redirecionado para a página de login.'
      })
      router.push('/sign-in')
    },
    onError: error => {
      toast.error('Falha ao criar conta', {
        description:
          error.message || 'Ocorreu um erro ao criar a conta. Tente novamente.',
        icon: <Lock className="h-4 w-4" />
      })
    }
  })

  async function handleSignUp(data: SignUpSchema) {
    try {
      await signUpFn(data)
    } catch (error) {
      console.error('Falha no cadastro:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Crie sua Conta</h2>
            <p className="text-slate-400 text-sm mt-2">
              Junte-se a nós! É rápido e fácil.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Nome Completo
              </Label>
              <div className="relative flex items-center">
                <User className="absolute left-3 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="bg-slate-900/50 border-slate-700 rounded-lg pl-10 focus:ring-emerald-500 focus:border-emerald-500"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-rose-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="bg-slate-900/50 border-slate-700 rounded-lg pl-10 focus:ring-emerald-500 focus:border-emerald-500"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-rose-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Senha
              </Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie uma senha forte"
                  className="bg-slate-900/50 border-slate-700 rounded-lg pl-10 focus:ring-emerald-500 focus:border-emerald-500"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-rose-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-br cursor-pointer from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 text-white text-base font-semibold hover:border-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Tem conta?{' '}
              <Link
                href="/sign-in"
                className="font-medium text-emerald-400 hover:underline"
              >
                Faça Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'bg-slate-800 text-white border border-slate-700',
          style: {
            fontSize: '14px',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }
        }}
      />
    </div>
  )
}
