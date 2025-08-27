'use client'

import { createCategory } from '@/api/categories/create-category'
import { createTransaction } from '@/api/transactions/create-transaction'
import { useTransactionsContext } from '@/app/transactions/_context/transactionsContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
import { toast } from 'sonner'
import z from 'zod'
import CalendarForm from './components/CalendarForm'
import { formatCurrency, getAmountPerInstallment } from './utils/utils'

const expenseTransactionSchema = z.object({
  title: z
    .string({ message: 'Título é obrigatório' })
    .min(2, 'Título deve ter pelo menos 2 caracteres')
    .max(100),
  amount: z
    .string({ message: 'Valor é obrigatório' })
    .min(1, 'Valor é obrigatório'),
  category: z
    .string({ message: 'Selecione uma categoria' })
    .min(1, 'Selecione uma categoria'),
  status: z.enum(['PENDING', 'PAID'], { message: 'Status é obrigatório' })
})

type ExpenseTransactionFormData = z.infer<typeof expenseTransactionSchema>

const FORM_CLASSES = {
  input:
    'bg-slate-900/50 border-slate-700/50 focus:border-red-500/80 focus-visible:ring-red-500/50',
  select: 'bg-slate-800/80 backdrop-blur-lg border-slate-700/50 text-white'
}

export function Expense() {
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [date, setDate] = useState(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [installments, setInstallments] = useState('2')
  const [amountType, setAmountType] = useState<'total' | 'per_installment'>(
    'total'
  )
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const { categoriesResults } = useTransactionsContext()

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<ExpenseTransactionFormData>({
    resolver: zodResolver(expenseTransactionSchema)
  })

  const categories = categoriesResults?.data.filter(
    category => category.type === 'EXPENSE'
  )
  const watchedAmount = watch('amount')

  const resetForm = () => {
    reset()
    setDate(new Date())
    setIsRecurring(false)
    setInstallments('2')
    setAmountType('total')
    setNewCategoryName('')
    setShowAddCategory(false)
    setIsSheetOpen(false)
  }

  const { mutate: categoryMutateFn } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] })
      setNewCategoryName('')
      setShowAddCategory(false)
      toast.success('Categoria criada com sucesso!')
    },
    onError: error => {
      toast.error(`Erro ao criar categoria: ${error.message}`)
    }
  })

  const { mutate: TransactionMutateFn } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      resetForm()
      toast.success('Despesa criada com sucesso!')
    },
    onError: error => {
      toast.error(`Erro ao criar despesa: ${error.message}`)
    }
  })

  function handleSubmitForm(data: ExpenseTransactionFormData) {
    const amount = getAmountPerInstallment(
      data.amount,
      amountType,
      installments
    )

    const transactionData = {
      title: data.title,
      amount,
      categoryId: data.category,
      status: data.status,
      type: 'EXPENSE' as const,
      installmentNumber: 1,
      totalInstallments: isRecurring ? parseInt(installments) : 1,
      effectiveDate: date
    }

    TransactionMutateFn(transactionData)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <div className="text-left hover:bg-red-500/20 cursor-pointer rounded-lg p-3 transition-colors duration-200">
          <div className="font-medium text-red-400">Adicionar Despesa</div>
          <div className="text-sm text-slate-400">
            Contas, compras, lazer...
          </div>
        </div>
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-slate-900/80 backdrop-blur-lg border-l border-slate-700/50 text-slate-200 p-0">
        <SheetHeader className="p-6 border-b border-slate-700/50">
          <SheetTitle className="text-red-400 text-2xl">
            Adicionar Nova Despesa
          </SheetTitle>
          <SheetDescription className="text-slate-400">
            Preencha os detalhes da sua nova saída financeira.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="expense-form"
        >
          <div className="grid gap-2">
            <Label htmlFor="expense-name">Transação</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="expense-name"
                  placeholder="Ex: Conta de luz"
                  className={FORM_CLASSES.input}
                  value={field.value || ''}
                  onChange={e => field.onChange(e.target.value)}
                  aria-invalid={!!errors.title}
                />
              )}
            />
            {errors.title && (
              <span className="text-red-400 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expense-amount">Valor</Label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Input
                  id="expense-amount"
                  type="text"
                  placeholder="R$ 0,00"
                  className={FORM_CLASSES.input}
                  value={formatCurrency(String(field.value || ''))}
                  onChange={e => field.onChange(formatCurrency(e.target.value))}
                  aria-invalid={!!errors.amount}
                />
              )}
            />
            {errors.amount && (
              <span className="text-red-400 text-sm">
                {errors.amount.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-700/50 p-3">
            <div className="space-y-0.5">
              <Label htmlFor="recurring-expense">
                Repetir despesa (parcelar)
              </Label>
              <p className="text-xs text-slate-400">
                Marque para compras parceladas ou assinaturas.
              </p>
            </div>
            <Switch
              id="recurring-expense"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          {isRecurring && (
            <div className="grid gap-4 p-4 border border-slate-700/50 rounded-lg">
              <div className="grid gap-2">
                <Label htmlFor="installments">Quantidade de Parcelas</Label>
                <Input
                  id="installments"
                  type="number"
                  value={installments}
                  onChange={e => setInstallments(e.target.value)}
                  className={FORM_CLASSES.input}
                  min="2"
                  required={isRecurring}
                />
              </div>

              <div className="grid gap-2">
                <Label>
                  O valor de {formatCurrency(watchedAmount?.toString() || '0')}{' '}
                  informado é:
                </Label>
                <RadioGroup
                  value={amountType}
                  onValueChange={value =>
                    setAmountType(value as 'total' | 'per_installment')
                  }
                  className="flex gap-4 pt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="total"
                      id="r-total"
                      className="text-red-500 border-slate-600"
                    />
                    <Label htmlFor="r-total" className="cursor-pointer">
                      Valor total da compra
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="per_installment"
                      id="r-installment"
                      className="text-red-500 border-slate-600"
                    />
                    <Label htmlFor="r-installment" className="cursor-pointer">
                      Valor de cada parcela
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="expense-category">Categoria</Label>
            <div className="flex items-center gap-3">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="expense-category"
                      className={FORM_CLASSES.input}
                    >
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent className={FORM_CLASSES.select}>
                      {categories?.map(cat => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="cursor-pointer hover:!bg-red-500/20"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Button
                type="button"
                size="sm"
                className="text-red-400 hover:text-red-300 justify-start p-0 h-auto gap-1 flex-shrink-0"
                onClick={() => setShowAddCategory(!showAddCategory)}
              >
                <PlusCircle className="h-4 w-4" />
                Nova categoria
              </Button>
            </div>
            {errors.category && (
              <span className="text-red-400 text-sm">
                {errors.category.message}
              </span>
            )}

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
                  className="bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-300 hover:text-red-300"
                  disabled={!newCategoryName.trim()}
                  onClick={() =>
                    categoryMutateFn({ name: newCategoryName, type: 'EXPENSE' })
                  }
                >
                  Adicionar
                </Button>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expense-status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="expense-status"
                    className={FORM_CLASSES.input}
                  >
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className={FORM_CLASSES.select}>
                    <SelectItem
                      value="PAID"
                      className="cursor-pointer hover:!bg-red-500/20"
                    >
                      Pago
                    </SelectItem>
                    <SelectItem
                      value="PENDING"
                      className="cursor-pointer hover:!bg-red-500/20"
                    >
                      Pendente
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <span className="text-red-400 text-sm">
                {errors.status.message}
              </span>
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
            form="expense-form"
            disabled={!isValid}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
          >
            Salvar Despesa
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
