'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    setUser(null)
    router.push('/login')
  }

  const firstName = user?.username ? user.username.split(' ')[0] : 'invitado'

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6h13M9 6L2 12l7 6" />
          </svg>
          <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer">
            LyricFinder
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/search"
            className={`text-gray-700 hover:text-indigo-600 transition font-medium ${
              pathname === '/search' ? 'border-b-2 border-indigo-600' : ''
            }`}
          >
            Buscar
          </Link>

          {user ? (
            <>
              <span className="text-gray-700 font-semibold">¡Hola, {firstName}!</span>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md font-semibold shadow-md hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-gray-700 hover:text-indigo-600 transition font-medium ${
                  pathname === '/login' ? 'border-b-2 border-indigo-600' : ''
                }`}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold shadow-md hover:bg-indigo-700 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-indigo-600 hover:text-indigo-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 border-t border-gray-200">
          <Link
            href="/search"
            className="block text-gray-700 hover:text-indigo-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Buscar
          </Link>

          {user ? (
            <>
              <span className="block text-gray-700 font-semibold">¡Hola, {firstName}!</span>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  handleLogout()
                }}
                className="w-full text-left text-red-600 font-semibold hover:text-red-700 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold shadow-md hover:bg-indigo-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
