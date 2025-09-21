'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  CreditCard,
  Download,
  PieChart,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet
} from 'lucide-react'
import { useState } from 'react'

// Dados estáticos para demonstração
const monthlyData = [
  { month: 'Jan', receitas: 4500, despesas: 3200, saldo: 1300 },
  { month: 'Fev', receitas: 5200, despesas: 3800, saldo: 1400 },
  { month: 'Mar', receitas: 4800, despesas: 4200, saldo: 600 },
  { month: 'Abr', receitas: 6100, despesas: 3900, saldo: 2200 },
  { month: 'Mai', receitas: 5500, despesas: 4500, saldo: 1000 },
  { month: 'Jun', receitas: 6800, despesas: 4100, saldo: 2700 }
]

const categoryData = [
  { name: 'Alimentação', value: 1850, color: 'bg-red-500', percentage: 31 },
  { name: 'Transporte', value: 890, color: 'bg-blue-500', percentage: 15 },
  {
    name: 'Entretenimento',
    value: 650,
    color: 'bg-purple-500',
    percentage: 11
  },
  { name: 'Saúde', value: 420, color: 'bg-green-500', percentage: 7 },
  { name: 'Educação', value: 380, color: 'bg-yellow-500', percentage: 6 },
  { name: 'Outros', value: 1810, color: 'bg-gray-500', percentage: 30 }
]

const recentTransactions = [
  {
    id: 1,
    description: 'Supermercado XYZ',
    category: 'Alimentação',
    amount: -285.5,
    date: '2024-06-15',
    type: 'despesa'
  },
  {
    id: 2,
    description: 'Salário',
    category: 'Receita',
    amount: 5500.0,
    date: '2024-06-01',
    type: 'receita'
  },
  {
    id: 3,
    description: 'Uber',
    category: 'Transporte',
    amount: -25.8,
    date: '2024-06-14',
    type: 'despesa'
  },
  {
    id: 4,
    description: 'Freelance',
    category: 'Receita',
    amount: 800.0,
    date: '2024-06-10',
    type: 'receita'
  },
  {
    id: 5,
    description: 'Netflix',
    category: 'Entretenimento',
    amount: -45.9,
    date: '2024-06-12',
    type: 'despesa'
  }
]

export default function ReportsClient() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')

  const totalReceitas = monthlyData.reduce(
    (acc, item) => acc + item.receitas,
    0
  )
  const totalDespesas = monthlyData.reduce(
    (acc, item) => acc + item.despesas,
    0
  )
  const saldoTotal = totalReceitas - totalDespesas
  const mediaReceitas = totalReceitas / monthlyData.length
  const mediaDespesas = totalDespesas / monthlyData.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
              Relatórios Financeiros
            </h1>
            <p className="text-slate-400">
              Análises detalhadas das suas finanças
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700/50 text-slate-200">
                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                <SelectItem value="1month">Último mês</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/20 text-emerald-300">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Receitas Totais
                  </p>
                  <p className="text-2xl font-bold text-emerald-400">
                    R$ {totalReceitas.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-emerald-300 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% vs mês anterior
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Despesas Totais
                  </p>
                  <p className="text-2xl font-bold text-red-400">
                    R$ {totalDespesas.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-red-300 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.2% vs mês anterior
                  </p>
                </div>
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Saldo Atual
                  </p>
                  <p className="text-2xl font-bold text-blue-400">
                    R$ {saldoTotal.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-blue-300 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +24.1% vs mês anterior
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Wallet className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Meta Mensal
                  </p>
                  <p className="text-2xl font-bold text-purple-400">75%</p>
                  <p className="text-xs text-purple-300 flex items-center mt-1">
                    <Target className="w-3 h-3 mr-1" />
                    R$ 1.500 restantes
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-200 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                Evolução Mensal
              </CardTitle>
              <CardDescription className="text-slate-400">
                Receitas vs Despesas nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.month}</span>
                      <div className="flex gap-4">
                        <span className="text-emerald-300">
                          R$ {item.receitas.toLocaleString()}
                        </span>
                        <span className="text-red-300">
                          R$ {item.despesas.toLocaleString()}
                        </span>
                        <span className="text-blue-300 font-medium">
                          R$ {item.saldo.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div
                        className="bg-emerald-500 rounded-l"
                        style={{
                          width: `${(item.receitas / Math.max(...monthlyData.map(d => d.receitas))) * 60}%`
                        }}
                      />
                      <div
                        className="bg-red-500 rounded-r"
                        style={{
                          width: `${(item.despesas / Math.max(...monthlyData.map(d => d.receitas))) * 60}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                  <span className="text-slate-300">Receitas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-slate-300">Despesas</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-200 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-400" />
                Gastos por Categoria
              </CardTitle>
              <CardDescription className="text-slate-400">
                Distribuição das despesas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryData.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded ${category.color}`}
                      ></div>
                      <span className="text-slate-300 text-sm">
                        {category.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-200 font-medium">
                        R$ {category.value.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {category.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Análise de Tendências
              </CardTitle>
              <CardDescription className="text-slate-400">
                Insights sobre seus hábitos financeiros
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">
                    Receitas em Alta
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  Suas receitas aumentaram 12.5% no último mês. Continue assim!
                </p>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-300 font-medium">
                    Atenção aos Gastos
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  Gastos com alimentação aumentaram 15% este mês.
                </p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-300 font-medium">
                    Meta Alcançável
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  Você está a R$ 1.500 de atingir sua meta de economia mensal.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Transações Recentes
              </CardTitle>
              <CardDescription className="text-slate-400">
                Últimas 5 transações registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === 'receita'
                            ? 'bg-emerald-500/20'
                            : 'bg-red-500/20'
                        }`}
                      >
                        <CreditCard
                          className={`w-4 h-4 ${
                            transaction.type === 'receita'
                              ? 'text-emerald-400'
                              : 'text-red-400'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-slate-200 font-medium text-sm">
                          {transaction.description}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {transaction.category} •{' '}
                          {new Date(transaction.date).toLocaleDateString(
                            'pt-BR'
                          )}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-bold ${
                        transaction.type === 'receita'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {transaction.type === 'receita' ? '+' : ''}R${' '}
                      {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-200">
              Médias e Comparativos
            </CardTitle>
            <CardDescription className="text-slate-400">
              Compare seus números com períodos anteriores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-emerald-400 mb-2">
                  R$ {mediaReceitas.toLocaleString('pt-BR')}
                </div>
                <div className="text-slate-400 text-sm mb-1">
                  Média de Receitas
                </div>
                <div className="text-emerald-300 text-xs flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +5.2% vs período anterior
                </div>
              </div>

              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-red-400 mb-2">
                  R$ {mediaDespesas.toLocaleString('pt-BR')}
                </div>
                <div className="text-slate-400 text-sm mb-1">
                  Média de Despesas
                </div>
                <div className="text-red-300 text-xs flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +3.1% vs período anterior
                </div>
              </div>

              <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {(
                    ((totalReceitas - totalDespesas) / totalReceitas) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-slate-400 text-sm mb-1">
                  Taxa de Economia
                </div>
                <div className="text-blue-300 text-xs flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +2.3% vs período anterior
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
