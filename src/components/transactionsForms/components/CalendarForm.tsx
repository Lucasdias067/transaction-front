import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

interface CalendarFormProps {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function CalendarForm({ date, setDate }: CalendarFormProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="date">Data</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/70 hover:text-slate-100',
              !date && 'text-slate-400'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
            {date ? (
              new Intl.DateTimeFormat('pt-BR', {
                weekday: 'long',
                month: 'long',
                day: '2-digit',
                year: 'numeric'
              }).format(date)
            ) : (
              <span>Selecione a data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 text-white rounded-xl shadow-2xl">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            required
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
