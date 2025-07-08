import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

export function MonthNavigator() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const formattedMonthYear = currentDate
    .toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    })
    .replace(/^\w/, c => c.toUpperCase())

  return (
    <div className="flex w-full items-center justify-end gap-4">
      <span className="text-lg font-semibold text-white">
        {formattedMonthYear}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
          onClick={handlePreviousMonth}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
          onClick={handleNextMonth}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
