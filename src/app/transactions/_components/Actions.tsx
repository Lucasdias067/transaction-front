import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { EllipsisVertical, Edit, Trash2 } from 'lucide-react'

interface ActionsProps {
  id: string
  // onEdit: (id: string) => void
  // onRemove: (id: string) => void
}

export function Actions({ id }: ActionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="text-slate-300" variant={'link'}>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-auto">
        {' '}
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log(id)}
          >
            <Edit />
            Editar
          </Button>
          <Button variant="destructive" onClick={() => console.log(id)} >
            <Trash2 />
            Remover
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
