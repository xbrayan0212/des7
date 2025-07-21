import './globals.css'
import Navbar from './components/Navbar'
import { UserProvider } from './context/UserContext'  // importa el contexto

export const metadata = {
  title: 'LyricFinder',
  description: 'Busca letras de canciones y guárdalas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <UserProvider>
          <Navbar />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  )
}
