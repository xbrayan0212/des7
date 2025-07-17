"use client";
import { useState } from "react";
import { fetchLyrics } from "@/services/fetchLyrics";
import { searchItunes } from "@/services/fetchItunes";
import { Track } from "@/types/Tracks";
import Image from "next/image";

export default function SearchPage() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSearch = async () => {
    if (!artist || !title) {
      setErrorMessage("Por favor, completa ambos campos.");
      return;
    }

    setIsLoading(true);
    setLyrics("");
    setTrack(null);
    setErrorMessage("");
    setIsFavorite(false);

    try {
      const fetchedLyrics = await fetchLyrics(artist, title);
      const fetchedTrack = await searchItunes(artist, title);

      if (!fetchedTrack && (!fetchedLyrics || fetchedLyrics === "⚠️ Letra no encontrada.")) {
        setErrorMessage("No se encontró información. Verifica el nombre del artista y la canción.");
      } else {
        setTrack(fetchedTrack);
        setLyrics(fetchedLyrics || "");

        // Verificar si ya está en favoritos
        try {
          const res = await fetch(
            `/api/favorites/check?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`
          );
          if (res.ok) {
            const data = await res.json();
            setIsFavorite(data.exists);
          } else {
            setIsFavorite(false);
          }
        } catch {
          setIsFavorite(false);
        }

        // Limpiar inputs después de búsqueda exitosa
        setArtist("");
        setTitle("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!track) return;

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artist: track.artist,
          title: track.title,
          lyrics,
          albumCover: track.albumCover || "",
          previewUrl: track.previewUrl || "",
        }),
      });

      if (res.status === 201) {
        alert("Guardado en favoritos ✅");
        setIsFavorite(true);
      } else if (res.status === 409) {
        alert("La canción ya está en favoritos");
        setIsFavorite(true);
      } else {
        alert("Error al guardar favorito");
      }
    } catch (error) {
      alert("Error al guardar favorito");
    }
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buscar Canción</h1>

      <input
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artista"
        className="border p-2 w-full mb-2"
        disabled={isLoading}
      />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="border p-2 w-full mb-2"
        disabled={isLoading}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
          disabled={isLoading}
        >
          Buscar
        </button>

        {track && lyrics && (
          <button
            onClick={handleSave}
            disabled={isFavorite || isLoading}
            className={`px-4 py-2 rounded flex-1 ${
              isFavorite ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white"
            }`}
          >
            {isFavorite ? "Ya está en Favoritos" : "Guardar en Favoritos"}
          </button>
        )}
      </div>

      {isLoading && (
        <div className="animate-pulse mt-6">
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
        </div>
      )}

      {errorMessage && <p className="text-red-500 mt-6">{errorMessage}</p>}

      {!isLoading && !errorMessage && track && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            {track.title} - {track.artist}
          </h2>
          {track.albumCover && (
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

      {!isLoading && !errorMessage && lyrics && (
        <>
          <h2 className="text-lg mt-4 font-bold">Letra:</h2>
          <pre className="bg-gray-100 p-4 whitespace-pre-wrap">{lyrics}</pre>
        </>
      )}
    </main>
  );
}
