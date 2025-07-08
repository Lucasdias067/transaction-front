import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

interface ActionsProps {
  id: string
  // onEdit: (id: string) => void
  // onRemove: (id: string) => void
}

export function Actions({ id }: ActionsProps) {
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
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-400 hover:bg-red-500/20 hover:text-red-300"
            onClick={() => console.log('Remove:', id)}
          >
            <Trash2 className="h-4 w-4" />
            Remover
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
