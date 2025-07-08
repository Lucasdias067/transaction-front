import { Expense } from '@/components/transactionsForms/expense'
import { Income } from '@/components/transactionsForms/income'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { columns } from '@/utils/columns'
import { PlusCircleIcon } from 'lucide-react'
import { useTransactionsContext } from '../_context/transactionsContext'
import { Actions } from './Actions'
import { MonthNavigator } from './MonthNavigator'

export function TransactionsTable() {
  const { transactionsResults } = useTransactionsContext()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
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
              {transactionsResults?.data.map((tx, index) => (
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
                          Parcela {tx.installmentNumber}/{tx.totalInstallments}
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
                      {tx.categoryId}
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
                        tx.status === 'PAID'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {tx.status === 'PAID'
                        ? 'Pago'
                        : tx.status === 'RECEIVED'
                          ? 'Recebido'
                          : 'Pendente'}
                    </span>
                  </TableCell>
                  <TableCell className="px-8 py-6 text-right">
                    <span className="text-slate-400 font-medium">
                      {new Date(tx.createdAt).toLocaleDateString('pt-BR')}
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
    </div>
  )
}
