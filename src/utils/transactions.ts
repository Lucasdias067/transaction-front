export const transactions = [
  {
    id: '1',
    title: 'Salary',
    amount: 5000,
    type: 'INCOME',
    installmentNumber: null,
    totalInstallments: null,
    installmentGroupId: null,
    category: { name: 'Salary', type: 'INCOME' },
    status: 'PAID',
    createdAt: '2024-06-01'
  },
  {
    id: '2',
    title: 'Groceries',
    amount: 200,
    type: 'EXPENSE',
    installmentNumber: null,
    totalInstallments: null,
    installmentGroupId: null,
    category: { name: 'Food', type: 'EXPENSE' },
    status: 'PAID',
    createdAt: '2024-06-02'
  },
  {
    id: '3',
    title: 'Laptop Installment',
    amount: 300,
    type: 'EXPENSE',
    installmentNumber: 1,
    totalInstallments: 12,
    installmentGroupId: 'group-1',
    category: { name: 'Electronics', type: 'EXPENSE' },
    status: 'PENDING',
    createdAt: '2024-06-03'
  },
  {
    id: '4',
    title: 'Freelance Project',
    amount: 1200,
    type: 'INCOME',
    installmentNumber: null,
    totalInstallments: null,
    installmentGroupId: null,
    category: { name: 'Freelance', type: 'INCOME' },
    status: 'PAID',
    createdAt: '2024-06-04'
  },
  {
    id: '5',
    title: 'Credit Card Bill',
    amount: 850,
    type: 'EXPENSE',
    installmentNumber: null,
    totalInstallments: null,
    installmentGroupId: null,
    category: { name: 'Bills', type: 'EXPENSE' },
    status: 'PENDING',
    createdAt: '2024-06-05'
  }
]

export const totalIncome = transactions
  .filter(tx => tx.type === 'INCOME' && tx.status === 'PAID')
  .reduce((sum, tx) => sum + tx.amount, 0)

export const totalExpenses = transactions
  .filter(tx => tx.type === 'EXPENSE' && tx.status === 'PAID')
  .reduce((sum, tx) => sum + tx.amount, 0)

export const balance = totalIncome - totalExpenses
