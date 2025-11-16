import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useTransactionsContext } from '@/context/transactionsContext'
import { PlusCircleIcon } from 'lucide-react'
import { useMemo } from 'react'
import { TransactionsSkeleton } from '../TransactionsSkeleton'
import { Expense } from '../transactionsForms/ExpenseSheet'
import { Income } from '../transactionsForms/IncomeSheet'
import { Actions } from './Actions'
import { MonthNavigator } from './MonthNavigator'

const statusConfig = {
  PAID: {
    text: 'Pago',
    className: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
  },
  RECEIVED: {
    text: 'Recebido',
    className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
  },
  PENDING: {
    text: 'Pendente',
    className: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
  },
  OVERDUE: {
    text: 'Atrasado',
    className: 'bg-red-500/20 text-red-300 border border-red-500/30'
  },
  CANCELED: {
    text: 'Cancelado',
    className: 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/30'
  }
}

const columns = [
  { name: 'Transação' },
  { name: 'Preço' },
  { name: 'Categoria' },
  { name: 'Tipo' },
  { name: 'Status' },
  { name: 'Data' },
  { name: 'Ações' }
]

export function TransactionsTable() {
  const { transactionsResults, setPage, setPerPage } = useTransactionsContext()

  const currentPage = transactionsResults?.meta.currentPage || 1
  const itemsPerPage = transactionsResults?.meta.perPage || 10
  const totalItems = transactionsResults?.meta?.total || 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const pageNumbersToDisplay = useMemo(() => {
    const pages = []
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }, [currentPage, totalPages])

  if (!transactionsResults) {
    return <TransactionsSkeleton />
  }

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <div className="bg-slate-800/50 backdrop-blur-lg  border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-items-center border-b border-slate-700/50 px-4 gap-4 py-6">
          <div className="hidden md:inline-block w-full">
            <h2 className="text-xl font-semibold text-white text-center">
              Transações Recentes
            </h2>
            <p className="text-slate-400 text-sm mt-1 text-center">
              As suas últimas atividades financeiras
            </p>
          </div>

          <Popover>
            <PopoverTrigger
              asChild
              className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 text-white"
            >
              <Button size="sm">
                Adicionar Transação <PlusCircleIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-auto bg-slate-800/50 backdrop-blur-lg border-slate-700/50 text-white rounded-xl shadow-2xl">
              <Income />
              <Expense />
            </PopoverContent>
          </Popover>

          <MonthNavigator />
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-slate-700/50 hover:bg-slate-700/20">
                {columns.map(column => (
                  <TableHead
                    key={column.name}
                    className="px-8 py-6 text-left font-semibold text-slate-300 text-base"
                  >
                    {column.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsResults &&
                transactionsResults.data.map((tx, index) => (
                  <TableRow
                    key={tx.id}
                    className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
                    }`}
                  >
                    <TableCell className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-base">
                          {tx.title}
                        </span>
                        {tx.installmentNumber && (
                          <span className="text-slate-400 text-sm mt-1">
                            Parcela {tx.installmentNumber}/
                            {tx.totalInstallments}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-right">
                      {tx.type === 'INCOME' ? (
                        <span className="text-emerald-400 font-bold text-lg">
                          + R${' '}
                          {tx.amount.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2
                          })}
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold text-lg">
                          - R${' '}
                          {tx.amount.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2
                          })}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <span className="text-slate-300 font-medium">
                        {tx.categoryName}
                      </span>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-center">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                          tx.type === 'INCOME'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {tx.type === 'INCOME' ? 'Receita' : 'Despesa'}
                      </span>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-center">
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                          statusConfig[tx.status]?.className ?? ''
                        }`}
                      >
                        {statusConfig[tx.status]?.text ?? 'Desconhecido'}
                      </span>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-right">
                      <span className="text-slate-400 font-medium">
                        {new Date(tx.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <Actions id={tx.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-6 px-2 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm w-full flex flex-col items-start text-slate-400">
          <p>
            Página {currentPage} de {totalPages}
          </p>{' '}
          <p>Total de transações: {totalItems}</p>
        </div>
        <Pagination className="w-full">
          <PaginationContent className="flex items-center gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && setPage((currentPage - 1).toString())
                }
                className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                  currentPage <= 1
                    ? 'pointer-events-none opacity-50 bg-slate-800/30 border-slate-700/30 text-slate-500'
                    : 'cursor-pointer bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-white'
                }`}
              />
            </PaginationItem>
            {pageNumbersToDisplay.map(pageNum => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={pageNum === currentPage}
                  onClick={() => setPage(pageNum.toString())}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                    pageNum === currentPage
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/20 hover:border-emerald-600/30 hover:text-emerald-400 font-medium'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-white'
                  }`}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > pageNumbersToDisplay.length && totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis className="px-2 py-2 text-slate-500" />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages &&
                  setPage((currentPage + 1).toString())
                }
                className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                  currentPage >= totalPages
                    ? 'pointer-events-none opacity-50 bg-slate-800/30 border-slate-700/30 text-slate-500'
                    : 'cursor-pointer bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-white'
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex items-center justify-end text-sm w-full text-slate-400">
          <p>Itens por página:</p>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={value => {
              setPerPage(value)
              setPage('1')
            }}
          >
            <SelectTrigger className="w-18 border border-gray-700 ml-2">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="ml-2 bg-transparent backdrop-blur-md text-slate-300 rounded-md">
              {[5, 10, 15, 20].map(size => (
                <SelectItem
                  className="cursor-pointer"
                  key={size}
                  value={size.toString()}
                  defaultValue={itemsPerPage.toString()}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
