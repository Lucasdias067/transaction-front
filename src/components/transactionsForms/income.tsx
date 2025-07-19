import { useTransactionsContext } from '@/app/transactions/_context/transactionsContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/use-query'
import { useMutation } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import CalendarForm from './components/CalendarForm'

export function Income() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrences, setRecurrences] = useState('3')

  const { CategoriesResults } = useTransactionsContext()

  const categories = CategoriesResults?.data.filter(category => {
    return category.type === 'INCOME'
  })

  const { mutate: categoryMutateFn } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (name: string) => {
      return await api.post('/categories', {
        name,
        type: 'INCOME'
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['category'] })
      setNewCategoryName('')
      setShowAddCategory(false)
    }
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!date) return

    if (isRecurring) {
      const incomeAmount = parseFloat(amount)
      const numRecurrences = parseInt(recurrences, 10)
      const newIncomes = []

      for (let i = 0; i < numRecurrences; i++) {
        const recurringDate = new Date(date)
        recurringDate.setMonth(recurringDate.getMonth() + i)

        newIncomes.push({
          title: `${title} (${i + 1}/${numRecurrences})`,
          amount: incomeAmount,
          type: 'INCOME',
          category,
          status,
          date: recurringDate.toISOString()
        })
      }
      console.log('Novas Receitas Recorrentes:', newIncomes)
    } else {
      const newIncome = {
        title,
        amount: parseFloat(amount),
        type: 'INCOME',
        category,
        status,
        date: date.toISOString()
      }
      console.log('Nova Receita:', newIncome)
    }
  }

  const formElementClasses =
    'bg-slate-900/50 border-slate-700/50 focus:border-emerald-500/80 focus-visible:ring-emerald-500/50'
  const formSelectContentClasses =
    'bg-slate-800/80 backdrop-blur-lg border-slate-700/50 text-white'

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="text-left hover:bg-emerald-500/20 cursor-pointer rounded-lg p-3 transition-colors duration-200">
          <div className="font-medium text-emerald-400">Adicionar Receita</div>
          <div className="text-sm text-slate-400">
            Salário, investimentos, presentes...
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-slate-900/80 backdrop-blur-lg border-l border-slate-700/50 text-slate-200 p-0">
        <SheetHeader className="p-6 border-b border-slate-700/50">
          <SheetTitle className="text-emerald-400 text-2xl">
            Adicionar Nova Receita
          </SheetTitle>
          <SheetDescription className="text-slate-400">
            Preencha os detalhes da sua nova entrada financeira.
          </SheetDescription>
        </SheetHeader>
        <form
          id="income-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="transaction-name">Transação</Label>
            <Input
              id="transaction-name"
              placeholder="Ex: Salário mensal"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={formElementClasses}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              placeholder="R$ 0,00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className={formElementClasses}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-700/50 p-3">
            <div className="space-y-0.5">
              <Label htmlFor="recurring-income">Receita recorrente</Label>
              <p className="text-xs text-slate-400">
                Marque se esta receita se repetirá (ex: salário).
              </p>
            </div>
            <Switch
              id="recurring-income"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          {isRecurring && (
            <div className="grid gap-2 p-4 border border-slate-700/50 rounded-lg">
              <Label htmlFor="recurrences">Repetir por quantos meses?</Label>
              <Input
                id="recurrences"
                type="number"
                placeholder="Ex: 12"
                value={recurrences}
                onChange={e => setRecurrences(e.target.value)}
                className={formElementClasses}
                min="2"
                required={isRecurring}
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <div className="flex items-center gap-3">
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category" className={formElementClasses}>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent className={formSelectContentClasses}>
                  {categories?.map(cat => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id}
                      className="cursor-pointer hover:!bg-emerald-500/20"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                size="sm"
                className="text-emerald-400 hover:text-emerald-300 justify-start p-0 h-auto gap-1 flex-shrink-0"
                onClick={() => setShowAddCategory(!showAddCategory)}
              >
                <PlusCircle className="h-4 w-4" />
                Nova categoria
              </Button>
            </div>

            {showAddCategory && (
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Nome da nova categoria"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  className={formElementClasses}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="bg-emerald-500/20 border-emerald-500/50 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-300"
                  onClick={() => categoryMutateFn(newCategoryName)}
                >
                  Adicionar
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger id="status" className={formElementClasses}>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent className={formSelectContentClasses}>
                <SelectItem
                  value="RECEIVED"
                  className="cursor-pointer hover:!bg-emerald-500/20"
                >
                  Recebido
                </SelectItem>
                <SelectItem
                  value="PENDING"
                  className="cursor-pointer hover:!bg-emerald-500/20"
                >
                  Pendente
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CalendarForm date={date} setDate={setDate} />
        </form>

        <SheetFooter className="p-6 mt-auto border-t border-slate-700/50">
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-slate-700 hover:bg-slate-800 hover:text-slate-300 text-slate-300"
            >
              Cancelar
            </Button>
          </SheetClose>
          <Button
            type="submit"
            form="income-form"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Salvar Receita
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
