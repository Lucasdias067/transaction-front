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
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import CalendarForm from './components/CalendarForm'

export function Expense() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [isRecurring, setIsRecurring] = useState(false)
  const [installments, setInstallments] = useState('2')
  const [amountType, setAmountType] = useState<'total' | 'per_installment'>(
    'total'
  )

  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const [categories, setCategories] = useState([
    { value: 'food', label: 'Alimentação' },
    { value: 'transport', label: 'Transporte' },
    { value: 'housing', label: 'Moradia' },
    { value: 'entertainment', label: 'Lazer' },
    { value: 'utilities', label: 'Contas' },
    { value: 'health', label: 'Saúde' },
    { value: 'education', label: 'Educação' },
    { value: 'others', label: 'Outros' }
  ])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!date) return

    if (isRecurring) {
      const totalAmount = parseFloat(amount)
      const numInstallments = parseInt(installments, 10)

      const installmentAmount =
        amountType === 'total' ? totalAmount / numInstallments : totalAmount

      const newExpenses = []
      for (let i = 0; i < numInstallments; i++) {
        const installmentDate = new Date(date)
        installmentDate.setMonth(installmentDate.getMonth() + i)

        newExpenses.push({
          title: `${title} (${i + 1}/${numInstallments})`,
          amount: installmentAmount,
          category,
          type: 'EXPENSE',
          status,
          date: installmentDate.toISOString()
        })
      }
      console.log('Novas Despesas Parceladas:', newExpenses)
    } else {
      const newExpense = {
        title,
        amount: parseFloat(amount),
        category,
        type: 'EXPENSE',
        status,
        date: date?.toISOString()
      }
      console.log('Nova Despesa:', newExpense)
    }

    // Lógica para fechar o sheet e exibir um toast de sucesso
  }

  function handleAddCategory() {
    if (newCategoryName.trim()) {
      const newValue = newCategoryName.toLowerCase().replace(/\s+/g, '-')
      setCategories([
        ...categories,
        { value: newValue, label: newCategoryName }
      ])
      setCategory(newValue)
      setNewCategoryName('')
      setShowAddCategory(false)
    }
  }

  const formElementClasses =
    'bg-slate-900/50 border-slate-700/50 focus:border-red-500/80 focus-visible:ring-red-500/50'
  const formSelectContentClasses =
    'bg-slate-800/80 backdrop-blur-lg border-slate-700/50 text-white'

  return (
    <Sheet>
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
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="expense-name">Transação</Label>
            <Input
              id="expense-name"
              placeholder="Ex: Conta de luz"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={formElementClasses}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expense-amount">Valor</Label>
            <Input
              id="expense-amount"
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
                  className={formElementClasses}
                  min="2"
                  required={isRecurring}
                />
              </div>

              <div className="grid gap-2">
                <Label>O valor de R$ {amount || '0,00'} informado é:</Label>
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
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger
                  id="expense-category"
                  className={formElementClasses}
                >
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent className={formSelectContentClasses}>
                  {categories.map(cat => (
                    <SelectItem
                      key={cat.value}
                      value={cat.value}
                      className="cursor-pointer hover:!bg-red-500/20"
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  className="bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-300 hover:text-red-300"
                  onClick={handleAddCategory}
                >
                  Adicionar
                </Button>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expense-status">Status</Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger id="expense-status" className={formElementClasses}>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent className={formSelectContentClasses}>
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
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
          >
            Salvar Despesa
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
