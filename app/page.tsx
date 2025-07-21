'use client'

import Link from 'next/link'
import { Button } from './components/ui/button'
import { Music, Heart, Search } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 max-w-7xl mx-auto mt-20">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-indigo-700">
            Encuentra la letra perfecta <br /> para tu momento 
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Busca letras de tus canciones favoritas por título o artista.
            Organiza y guarda tus letras para cualquier ocasión.
          </p>
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white shadow-lg font-semibold">
            <Link href="/search">Buscar letra ahora</Link>
          </Button>
        </div>
        <div className="flex-1">
          <img
            src="https://miro.medium.com/v2/resize:fit:4000/1*oTHcJL6ikMpmixD0B5JHyw.jpeg"
            alt="Música"
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto mt-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition cursor-default">
          <Search size={48} className="mx-auto mb-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">Búsqueda Rápida</h3>
          <p className="text-gray-700 max-w-xs mx-auto">
            Busca letras por título, artista o palabras clave con rapidez y precisión.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition cursor-default">
          <Heart size={48} className="mx-auto mb-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">Favoritos</h3>
          <p className="text-gray-700 max-w-xs mx-auto">
            Guarda tus letras preferidas en tu perfil personal y accede cuando quieras.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition cursor-default">
          <Music size={48} className="mx-auto mb-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">Biblioteca musical</h3>
          <p className="text-gray-700 max-w-xs mx-auto">
            Organiza y accede a tus letras en cualquier momento y dispositivo.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 mt-auto">
        © {new Date().getFullYear()} LetrasApp 
      </footer>
    </main>
  )
}
