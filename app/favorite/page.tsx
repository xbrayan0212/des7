"use client";

import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "@/services/favoritesAPI";
import { Track } from "@/types/Tracks";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Track[]>([]);

  const fetchFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteFavorite(id);
    fetchFavorites();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-600 flex items-center gap-3">
        <span>🎵</span> Tus Canciones Favoritas
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 italic text-lg">
          No tienes canciones guardadas aún.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((track: Track) => (
            <div
              key={track._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center"
            >
              <Image
                src={track.albumCover}
                alt={`${track.title} cover`}
                width={180}
                height={180}
                className="rounded-xl mb-4 object-cover"
                priority
              />
              <h2 className="font-semibold text-lg text-gray-800 text-center mb-1 truncate w-full">
                {track.title}
              </h2>
              <p className="text-sm text-indigo-500 mb-3 truncate w-full text-center">
                {track.artist}
              </p>
              <audio
                src={track.previewUrl}
                controls
                className="w-full rounded-md shadow-inner"
              />
              <button
                onClick={() => handleDelete(track._id)}
                className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-2 transition-colors duration-200 shadow-md"
                aria-label={`Eliminar ${track.title} de favoritos`}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Link href="/search" passHref>
          <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-8 py-3 shadow-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            🔍 Volver a buscar
          </button>
        </Link>
      </div>
    </div>
  );
}
