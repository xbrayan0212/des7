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
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">🎵 Tus Canciones Favoritas</h1>

            {favorites.length === 0 ? (
                <p className="text-gray-500">No tienes canciones guardadas aún.</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {favorites.map((track: any) => (
                        <div key={track._id} className="border rounded p-4 flex flex-col items-center shadow">
                            <Image
                                src={track.albumCover}
                                alt={`${track.title} cover`}
                                width={150}
                                height={150}
                                className="rounded mb-2"
                            />
                            <h2 className="font-semibold">{track.title}</h2>
                            <p className="text-sm text-gray-500">{track.artist}</p>
                            <audio src={track.previewUrl} controls className="my-2 w-full" />
                            <button
                                onClick={() => handleDelete(track._id)}
                                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8">
                <Link href="/search">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                        🔍 Volver a buscar
                    </button>
                </Link>
            </div>
        </div>
    );
}
