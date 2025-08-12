export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      {children}
      {/* <Toaster
        position="top-center"
        theme="system"
        richColors
        duration={2000}
      /> */}
    </main>
  )
}
