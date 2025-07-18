import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  TrendingDown,
  TrendingUp
} from 'lucide-react'
import {
  balance,
  totalExpenses,
  totalIncome
} from '../../../utils/transactions'

export function SumaryCards() {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
          Gerenciamento Financeiro
        </h1>
        <p className="text-slate-400 text-lg">
          Acompanhe suas receitas e despesas com estilo
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-sm font-medium uppercase tracking-wide">
                Total Receitas
              </p>
              <p className="text-white text-2xl font-bold">
                R${' '}
                {totalIncome.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="h-12 w-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-emerald-400 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium uppercase tracking-wide">
                Total Despesas
              </p>
              <p className="text-white text-2xl font-bold">
                R${' '}
                {totalExpenses.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="h-12 w-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="text-red-400 text-xl" />
            </div>
          </div>
        </div>

        <div
          className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-500/20 to-blue-600/10 border-blue-500/20' : 'from-orange-500/20 to-orange-600/10 border-orange-500/20'} backdrop-blur-sm border rounded-2xl p-6`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`${balance >= 0 ? 'text-blue-400' : 'text-orange-400'} text-sm font-medium uppercase tracking-wide`}
              >
                Balanço Mensal
              </p>
              <p className="text-white text-2xl font-bold">
                R${' '}
                {Math.abs(balance).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </p>
            </div>
            <div
              className={`h-12 w-12 ${balance >= 0 ? 'bg-blue-500/20' : 'bg-orange-500/20'} rounded-xl flex items-center justify-center`}
            >
              <span
                className={`${balance >= 0 ? 'text-blue-400' : 'text-orange-400'} text-xl`}
              >
                {balance >= 0 ? <ArrowUpNarrowWide /> : <ArrowDownNarrowWide />}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
