import { createCategory } from '@/api/categories/create-category'
import { createTransaction } from '@/api/transactions/create-transaction'
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
import { queryClient } from '@/lib/use-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import z from 'zod'
import CalendarForm from './components/CalendarForm'
import { formatCurrency, validateRecurrences } from './utils/utils'

const incomeTransactionSchema = z.object({
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres').max(100),
  amount: z
    .string()
    .transform(val => {
      const numbers = val.replace(/\D/g, '')
      return numbers ? parseInt(numbers) / 100 : 0
    })
    .refine(val => val > 0, { message: 'Valor deve ser maior que zero' })
    .transform(val => val.toString()),
  category: z.string().min(1, 'Selecione uma categoria'),
  status: z.enum(['PENDING', 'RECEIVED'])
})

type IncomeTransactionFormData = z.infer<typeof incomeTransactionSchema>

// Constantes
const FORM_CLASSES = {
  input:
    'bg-slate-900/50 border-slate-700/50 focus:border-emerald-500/80 focus-visible:ring-emerald-500/50',
  select: 'bg-slate-800/80 backdrop-blur-lg border-slate-700/50 text-white'
}

const TOAST_CONFIG = {
  position: 'bottom-left' as const,
  style: { background: '#1e293b', color: '#fff' }
}

export function Income() {
  // Estados
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [date, setDate] = useState(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrences, setRecurrences] = useState('2')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Hooks
  const { CategoriesResults } = useTransactionsContext()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm<IncomeTransactionFormData>({
    resolver: zodResolver(incomeTransactionSchema)
  })

  // Dados derivados
  const categories = CategoriesResults?.data.filter(
    category => category.type === 'INCOME'
  )
  const isRecurrenceValid = validateRecurrences(recurrences)

  // Reset form function
  const resetForm = () => {
    reset()
    setDate(new Date())
    setIsRecurring(false)
    setRecurrences('2')
    setNewCategoryName('')
    setShowAddCategory(false)
    setIsSheetOpen(false)
  }

  // Mutations
  const { mutate: categoryMutateFn } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: createCategory,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['category'] })
      setNewCategoryName('')
      setShowAddCategory(false)
      toast.success('Categoria criada com sucesso!', TOAST_CONFIG)
    }
  })

  const { mutate: TransactionMutateFn } = useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: createTransaction,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      resetForm()
      toast.success('Receita criada com sucesso!', TOAST_CONFIG)
    }
  })

  // Handlers
  function handleSubmitForm(data: IncomeTransactionFormData) {
    TransactionMutateFn({
      title: data.title,
      amount: parseFloat(data.amount),
      type: 'INCOME',
      categoryId: data.category,
      status: data.status,
      installmentNumber: 1,
      totalInstallments: isRecurring ? parseInt(recurrences) : 1,
      effectiveDate: date
    })
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="transaction-name">Transação</Label>
            <Input
              id="transaction-name"
              placeholder="Ex: Salário mensal"
              className={FORM_CLASSES.input}
              aria-invalid={!!errors.title}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Valor</Label>
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="amount"
                  type="text"
                  placeholder="R$ 0,00"
                  className={FORM_CLASSES.input}
                  value={formatCurrency(String(field.value || ''))}
                  onChange={e => field.onChange(e.target.value)}
                  aria-invalid={!!errors.amount}
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
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
                className={FORM_CLASSES.input}
                min="2"
                max="12"
                required={isRecurring}
              />
              {isRecurring && !isRecurrenceValid && (
                <p className="text-red-500 text-sm">
                  Recorrência deve ser entre 2 e 12 meses
                </p>
              )}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <div className="flex items-center gap-3">
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="category" className={FORM_CLASSES.input}>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent className={FORM_CLASSES.select}>
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
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
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
                  className={FORM_CLASSES.input}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="bg-emerald-500/20 border-emerald-500/50 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-300"
                  onClick={() =>
                    categoryMutateFn({ name: newCategoryName, type: 'INCOME' })
                  }
                >
                  Adicionar
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="status" className={FORM_CLASSES.input}>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className={FORM_CLASSES.select}>
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
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
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
            disabled={!isValid}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Salvar Receita
          </Button>
        </SheetFooter>
      </SheetContent>
      <Toaster {...TOAST_CONFIG} />
    </Sheet>
  )
}
