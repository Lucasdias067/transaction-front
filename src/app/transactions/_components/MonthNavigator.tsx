import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

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
    .toUpperCase()

  return (
    <div className="py-6 md:px-14 w-full flex gap-4 justify-between text-center text-white font-semibold items-center">
      <Button
        variant="default"
        size="icon"
        className="size-8"
        onClick={handlePreviousMonth}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="w-full">{formattedMonthYear}</div>
      <Button
        variant="default"
        size="icon"
        className="size-8"
        onClick={handleNextMonth}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
