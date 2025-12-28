'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadAvatarModal } from '@/features/users/UploadAvatarModal'
import { Calendar, Camera, Mail, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { toast } from 'sonner'

const socket = io(process.env.NEXT_PUBLIC_API_URL)

export default function ProfileClient() {
  const { data: session } = useSession()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
      socket.emit('JoinAdminRoom', session?.user?.id)
    })

    socket.on('transaction-created', () => {
      console.log('Transaction created')
      toast.success('Nova transação criada!')
    })

    return () => {
      socket.off('connect')
      socket.off('transaction-created')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Meu Perfil
          </h1>
          <p className="text-slate-400">Gerencie as informações da sua conta</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1 bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardHeader className="text-center">
              <CardTitle className="text-slate-200">Foto do Perfil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-slate-600/60 shadow-lg">
                  <AvatarImage
                    src={
                      `${process.env.NEXT_PUBLIC_AVATAR_URL}${session?.user?.avatar || ''}` ||
                      ''
                    }
                  />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-300 border border-emerald-500/20">
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/20"
                >
                  <Camera className="h-4 w-4 text-emerald-400" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-600/50 hover:text-slate-200"
                onClick={() => setIsUploadModalOpen(true)}
              >
                Alterar Foto
              </Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-200 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-400" />
                Informações Pessoais
              </CardTitle>
              <CardDescription className="text-slate-400">
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-slate-200 flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    Nome
                  </Label>
                  <Input
                    id="name"
                    defaultValue={session?.user?.name || ''}
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 focus:border-emerald-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-slate-200 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4 text-slate-400" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    disabled
                    defaultValue={session?.user?.email || ''}
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-200">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    disabled
                    placeholder="(11) 99999-9999"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 focus:border-emerald-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="birthdate"
                    className="text-slate-200 flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Data de Nascimento
                  </Label>
                  <Input
                    id="birthdate"
                    type="date"
                    disabled
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button className="bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 transition-colors text-white border-0">
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6 bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-200">Segurança</CardTitle>
            <CardDescription className="text-slate-400">
              Gerencie a segurança da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-slate-200">
                    Senha Atual
                  </Label>
                  <Input
                    id="current-password"
                    autoComplete="current-password"
                    type="password"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 focus:border-emerald-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-slate-200">
                    Nova Senha
                  </Label>
                  <Input
                    id="new-password"
                    autoComplete="new-password"
                    type="password"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-200 focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-200">
                  Confirmar Nova Senha
                </Label>
                <Input
                  id="confirm-password"
                  autoComplete="new-password"
                  type="password"
                  className="bg-slate-700/50 border-slate-600/50 text-slate-200 focus:border-emerald-500/50"
                />
              </div>
              <Button
                variant="outline"
                className="bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-600/50"
              >
                Alterar Senha
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <UploadAvatarModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        userId={session?.user?.id || ''}
      />
    </div>
  )
}
