import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua conta'
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>
}
