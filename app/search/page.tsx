"use client";
import { useState } from "react";
import { fetchLyrics } from "@/services/fetchLyrics";
import { searchItunes } from "@/services/fetchItunes";
import { addFavorite } from "@/services/favoritesAPI";
import { Track } from "@/types/Tracks";
import Image from "next/image";

export default function SearchPage() {
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [track, setTrack] = useState<Track | null>(null);

    const handleSearch = async () => {
        const fetchedLyrics = await fetchLyrics(artist, title);
        setLyrics(fetchedLyrics);

        const fetchedTrack = await searchItunes(artist, title);
        setTrack(fetchedTrack);
    };

    const handleSave = async () => {
        if (!track) return;
        await addFavorite({
            artist,
            title,
            lyrics,
            albumCover: track.albumCover || "",
            previewUrl: track.previewUrl || "",
        });
        alert("Guardado en favoritos ✅");
    };

    return (
        <main className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Buscar Canción</h1>
            <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artista" className="border p-2 w-full mb-2" />
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="border p-2 w-full mb-2" />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>

            {track && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">{track.title} - {track.artist}</h2>
                    {track?.albumCover && (
                      <Image
                          src={track.albumCover}
                          alt="Album cover"
                          width={200}
                          height={200}
                          className="my-2 rounded"
                      />
                  )}
                    <audio controls src={track.previewUrl} className="w-full"></audio>
                </div>
            )}

            <h2 className="text-lg mt-4 font-bold">Letra:</h2>
            <pre className="bg-gray-100 p-4 whitespace-pre-wrap">{lyrics}</pre>

            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">Guardar en Favoritos</button>
        </main>
    );
}
