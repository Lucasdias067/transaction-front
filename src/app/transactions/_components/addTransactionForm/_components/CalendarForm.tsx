import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface CalendarProps {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function CalendarForm({ date, setDate }: CalendarProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor="date">Data</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
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
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
