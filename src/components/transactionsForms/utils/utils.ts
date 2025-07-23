export const formatCurrency = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (!numbers) return ''
  const amount = parseInt(numbers) / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export const validateRecurrences = (value: string) => {
  const num = parseInt(value)
  return num >= 2 && num <= 12
}

export function parseCurrency(value: string): number {
  return parseFloat(
    value.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.').trim()
  ) || 0
}

export function getAmountPerInstallment(
  value: string,
  amountType: 'total' | 'per_installment',
  installments: string
): number {
  const numericValue = parseCurrency(value)
  return amountType === 'total'
    ? numericValue / parseInt(installments)
    : numericValue
}