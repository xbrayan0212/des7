'use client'

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'
import { UserContext } from '../context/UserContext' // Ajusta la ruta si es necesario

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, type: 'register' }),
      })

      const contentType = res.headers.get('content-type') || ''
      const data = contentType.includes('application/json') ? await res.json() : null

      if (!res.ok) {
        if (data?.message) {
          alert(`Error: ${data.message}`)
        } else {
          const text = await res.text()
          alert(`Error inesperado: ${text}`)
        }
        return
      }

      // ✅ Registro exitoso: guardar usuario en contexto y localStorage
      if (data?.user) {
        setUser(data.user)
      } else {
        // Si no viene user del backend, puedes crear uno localmente:
        setUser({ name, email })
      }

      // Limpiar formulario
      setName('')
      setEmail('')
      setPassword('')

      // Redirigir a /search
      router.push('/search')
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Error en la conexión con el servidor: ' + error)
    }
  }

  return (
    <main className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-8 text-center tracking-wide">
        Registrarse
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </label>

        <label className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </label>

        <label className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-white font-semibold rounded-lg py-3 shadow-md transition duration-200"
        >
          Crear cuenta
        </button>
      </form>
    </main>
  )
}
