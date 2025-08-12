import { useMutation } from '@tanstack/react-query'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { deleteTransaction } from '@/api/transactions/delete-transaction'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { queryClient } from '@/lib/use-query'

interface ActionsProps {
  id: string
}

export function Actions({ id }: ActionsProps) {
  const { mutate: deleteTransactionMutateFn } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transação removida com sucesso!')
    }
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="text-slate-300 bg-transparent hover:bg-slate-700/50"
        >
          <EllipsisVertical className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-auto bg-slate-800/50 backdrop-blur-lg border-slate-700/50 text-white rounded-xl shadow-2xl">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            onClick={() => console.log('Edit:', id)}
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
                Remover
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-bold text-red-400">
                  Deseja remover esta transação?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  Esta ação não pode ser desfeita. Isso removerá permanentemente
                  a transação do seu histórico.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gap-2 mt-4">
                <AlertDialogCancel className="bg-slate-700/70 text-slate-300 hover:bg-slate-700/90 hover:text-slate-400 border border-slate-600 rounded-lg px-4 py-2">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTransactionMutateFn(id)}
                  className="bg-red-600/70 text-white hover:bg-red-600/50  rounded-lg px-4 py-2 font-semibold"
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  )
}
