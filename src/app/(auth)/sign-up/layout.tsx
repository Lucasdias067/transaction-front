import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cadastrar',
  description: 'Crie sua conta'
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>
}
