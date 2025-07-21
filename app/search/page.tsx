"use client";
import { useEffect, useState } from "react";
import { fetchLyrics } from "@/services/fetchLyrics";
import { searchItunes } from "@/services/fetchItunes";
import { Track } from "@/types/Tracks";
import Image from "next/image";
import TopTracks from '../components/TopTracks';

export default function SearchPage() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Cuando artist o title cambian y no están vacíos, buscar
  useEffect(() => {
    if (artist && title) {
      handleSearch(artist, title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artist, title]);

  const handleSearch = async (artistParam: string, titleParam: string) => {
    setIsLoading(true);
    setLyrics("");
    setTrack(null);
    setErrorMessage("");
    setIsFavorite(false);

    try {
      const fetchedLyrics = await fetchLyrics(artistParam, titleParam);
      const fetchedTrack = await searchItunes(artistParam, titleParam);

      if (!fetchedTrack && (!fetchedLyrics || fetchedLyrics === "⚠️ Letra no encontrada.")) {
        setErrorMessage("No se encontró información. Verifica el nombre del artista y la canción.");
      } else {
        setTrack(fetchedTrack);
        setLyrics(fetchedLyrics || "");

        try {
          const res = await fetch(
            `/api/favorites/check?artist=${encodeURIComponent(artistParam)}&title=${encodeURIComponent(titleParam)}`
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

        // Opcional: si quieres limpiar inputs, descomenta:
        // setArtist("");
        // setTitle("");
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
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 mb-20">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Buscar Canción</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (artist && title) handleSearch(artist, title);
        }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <input
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artista"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
          disabled={isLoading}
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-6 py-3 transition disabled:bg-indigo-300"
          disabled={isLoading}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {errorMessage && (
        <p className="text-center text-red-600 mb-6 font-medium">{errorMessage}</p>
      )}

      {track && lyrics && (
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {track.albumCover && (
              <Image
                src={track.albumCover}
                alt={`${track.title} cover`}
                width={200}
                height={200}
                className="rounded-lg shadow-md"
              />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                {track.title} - {track.artist}
              </h2>
              {track.previewUrl && (
                <audio controls src={track.previewUrl} className="w-full rounded-md">
                  Tu navegador no soporta reproducción de audio.
                </audio>
              )}
              <button
                onClick={handleSave}
                disabled={isFavorite}
                className={`mt-4 px-5 py-3 rounded-md text-white font-semibold transition ${
                  isFavorite
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isFavorite ? "Ya está en Favoritos" : "Guardar en Favoritos"}
              </button>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 p-6 rounded-lg whitespace-pre-wrap text-gray-700 shadow-inner max-h-[400px] overflow-y-auto font-mono">
            {lyrics}
          </div>
        </section>
      )}

      {isLoading && !lyrics && (
        <div className="mt-10 space-y-4 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-full mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-full mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
        </div>
      )}

      <TopTracks
        onTrackSelect={(selectedArtist, selectedTitle) => {
          setArtist(selectedArtist);
          setTitle(selectedTitle);
        }}
      />
    </main>
  );
}
