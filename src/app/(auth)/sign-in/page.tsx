import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
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
          <form className="space-y-6">
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
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 text-white text-base font-semibold hover:border-emerald-500/40 transition-all duration-300"
            >
              Entrar
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
    </div>
  )
}