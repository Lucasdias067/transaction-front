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
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import CalendarForm from './_components/CalendarForm'

export function Income() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState(new Date())
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const [categories, setCategories] = useState([
    { value: 'salary', label: 'Salário' },
    { value: 'investments', label: 'Investimentos' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'gift', label: 'Presente' },
    { value: 'sales', label: 'Vendas' },
    { value: 'others', label: 'Outros' }
  ])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newIncome = {
      title,
      amount: parseFloat(amount),
      type: 'INCOME',
      category,
      status,
      date: date.toISOString()
    }
    console.log('Nova Receita:', newIncome)
    alert('Receita adicionada com sucesso! (Verifique o console para os dados)')

    setTitle('')
    setAmount('')
    setCategory('')
    setStatus('')
    setDate(new Date())
  }

  function handleAddCategory() {
    if (newCategoryName.trim()) {
      const newValue = newCategoryName.toLowerCase().replace(/\s+/g, '-')
      setCategories([
        ...categories,
        {
          value: newValue,
          label: newCategoryName
        }
      ])
      setCategory(newValue)
      setNewCategoryName('')
      setShowAddCategory(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="text-left hover:bg-green-500/20 cursor-pointer rounded-xl p-2">
          <div className="font-medium text-green-400">Adicionar Receita</div>
          <div className="text-sm opacity-75">
            Salário, investimentos, presentes...
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md h-full max-h-screen p-4 flex flex-col">
        {' '}
        <SheetHeader>
          <SheetTitle>Adicionar Nova Receita</SheetTitle>
          <SheetDescription>
            Preencha os detalhes da sua receita aqui. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit}
          className="grid flex-1 auto-rows-min gap-6 px-4 py-4"
        >
          <div className="grid gap-3">
            <Label htmlFor="transaction-name">Transação</Label>
            <Input
              id="transaction-name"
              placeholder="Nome da transação (ex: Salário mensal)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">Categoria</Label>
            <div className="flex items-center gap-3">
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground flex items-center gap-1"
                onClick={() => setShowAddCategory(!showAddCategory)}
              >
                <PlusCircle className="h-4 w-4" />
                Nova categoria
              </Button>
            </div>

            {showAddCategory && (
              <div className="flex gap-2">
                <Input
                  placeholder="Nome da nova categoria"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddCategory}
                >
                  Adicionar
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="RECEIVED">Recebido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CalendarForm date={date} setDate={setDate} />
          <SheetFooter className="mt-6 flex flex-col sm:flex-row-reverse sm:space-x-2 sm:space-x-reverse">
            <Button type="submit">Salvar Receita</Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
