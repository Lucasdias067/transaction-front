'use client'

import { uploadUserAvatar } from '@/api/users/upload-avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'
import { useState } from 'react'

interface UploadAvatarModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
}

export function UploadAvatarModal({
  open,
  onOpenChange,
  userId
}: UploadAvatarModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      // Criar preview da imagem
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('avatar', selectedFile)

      const { avatarUrl } = await uploadUserAvatar({
        id: userId,
        data: formData
      })

      console.log('Upload realizado:', selectedFile.name)
      console.log('URL do avatar:', avatarUrl)

      onOpenChange(false)
      setSelectedFile(null)
      setPreview(null)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null)
      setPreview(null)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-800/95 backdrop-blur-lg border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="text-slate-200">
            Alterar Foto de Perfil
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Selecione uma nova foto para o seu perfil
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            {preview ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-600/60 shadow-lg">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-40 h-40 rounded-full bg-slate-700/50 border-4 border-dashed border-slate-600/60">
                <Upload className="h-10 w-10 text-slate-400" />
              </div>
            )}

            <div className="w-full">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="avatar-upload"
                disabled={isUploading}
              />
              <label htmlFor="avatar-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-600/50 cursor-pointer"
                  onClick={() =>
                    document.getElementById('avatar-upload')?.click()
                  }
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Arquivo
                </Button>
              </label>
            </div>

            {selectedFile && (
              <p className="text-sm text-slate-400 text-center">
                {selectedFile.name}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
            className="bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-600/50"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 transition-colors text-white border-0"
          >
            {isUploading ? 'Enviando...' : 'Enviar Foto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
