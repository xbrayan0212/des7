'use client'

import { useState, useContext } from 'react'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { UserContext } from '../context/UserContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { setUser } = useContext(UserContext)

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!email || !password) {
    alert('Correo o contraseña inválidos')
    return
  }

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password }),
  })

  if (res.ok) {
    setUser({ name: email.split('@')[0], email })
    router.push('/search')
  } else {
    alert('Credenciales inválidas')
  }
}

  return (
    <main className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-8 text-center tracking-wide">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-white font-semibold rounded-lg py-3 shadow-md transition duration-200"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
