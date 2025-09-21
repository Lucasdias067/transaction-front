'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { BarChart3, CreditCard, LogIn, LogOut, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950 backdrop-blur-lg border-b border-slate-800 shadow-3xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/transactions" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl">
              <CreditCard className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:to-emerald-300 transition-all duration-300">
                Finance App
              </h1>
              <p className="text-slate-400 text-sm -mt-1">
                Controle suas finanças
              </p>
            </div>
          </Link>

          <nav>
            {status === 'loading' && (
              <div className="h-12 w-32 bg-slate-700/30 backdrop-blur-sm rounded-xl animate-pulse border border-slate-600/30" />
            )}

            {status === 'unauthenticated' && (
              <Button
                asChild
                className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 text-white"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Fazer Login
                </Link>
              </Button>
            )}

            {status === 'authenticated' && session.user && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 px-8 py-7 hover:bg-slate-700/30 rounded-xl border border-slate-600/30 backdrop-blur-sm"
                  >
                    <Avatar className="h-9 w-9 border-2 border-slate-600/60 shadow-lg">
                      <AvatarImage src={''} />
                      <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-300 border border-emerald-500/20">
                        {session.user.name?.[0].toUpperCase() ?? '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-slate-200 font-medium text-sm leading-tight">
                        {session.user.name}
                      </p>
                      <p className="text-slate-400 text-xs leading-tight">
                        {session.user.email}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 shadow-2xl text-slate-200 rounded-xl w-56 p-2">
                  <DropdownMenuLabel className="text-slate-300 text-sm px-3 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium">Minha Conta</p>
                      <p className="text-xs text-slate-400 font-normal">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-slate-600/40 my-2" />

                  <DropdownMenuItem
                    asChild
                    className="relative flex cursor-pointer select-none items-center rounded-lg p-0 outline-none transition-colors focus:bg-slate-700/50 focus:text-slate-200"
                  >
                    <Link
                      href="/profile"
                      className="flex w-full items-center gap-3 px-3 py-2"
                    >
                      <div className="p-1 bg-blue-500/20 rounded-md">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="relative flex cursor-pointer select-none items-center rounded-lg p-0 outline-none transition-colors focus:bg-slate-700/50 focus:text-slate-200"
                  >
                    <Link
                      href="/transactions"
                      className="flex w-full items-center gap-3 px-3 py-2"
                    >
                      <div className="p-1 bg-emerald-500/20 rounded-md">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span>Transações</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="relative flex cursor-pointer select-none items-center rounded-lg p-0 outline-none transition-colors focus:bg-slate-700/50 focus:text-slate-200"
                  >
                    <Link
                      href="/reports"
                      className="flex w-full items-center gap-3 px-3 py-2"
                    >
                      <div className="p-1 bg-purple-500/20 rounded-md">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                      </div>
                      <span>Relatórios</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-slate-600/40 my-2" />

                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/sign-in' })}
                    className="flex items-center gap-3 px-3 py-2 focus:bg-red-500/20 rounded-lg cursor-pointer focus:text-red-300"
                  >
                    <div className="p-1 bg-red-500/20 rounded-md">
                      <LogOut className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-red-300">Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
