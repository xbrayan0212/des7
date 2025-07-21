"use client";
import { useEffect, useState } from "react";
import { Music } from "lucide-react";

type Track = {
  title: string;
  artist: string;
  albumCover: string;
  previewUrl: string;
};

export default function TopTracks({ onTrackSelect }: { onTrackSelect: (artist: string, title: string) => void }) {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string>("");

  const limit = 100;

  useEffect(() => {
    async function fetchTracks() {
      setError("");
      try {
        const offset = page * limit;
        // Proxy CORS para evitar bloqueo en navegador (solo desarrollo)
        const corsProxy = "https://cors-anywhere.herokuapp.com/";
        const url = `${corsProxy}https://api.deezer.com/chart/0/tracks?limit=${limit}&index=${offset}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar canciones");

        const data = await res.json();

        const tracks = data.data.map((item: any) => ({
          title: item.title,
          artist: item.artist.name,
          albumCover: item.album.cover_medium,
          previewUrl: item.preview,
        }));

        setTopTracks(tracks);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la lista de canciones.");
      }
    }
    fetchTracks();
  }, [page]);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
        <Music className="w-5 h-5" /> Sugerencias
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {topTracks.map((track, i) => (
          <div
            key={i}
            onClick={() => onTrackSelect(track.artist, track.title)}
            className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition overflow-hidden"
          >
            <img src={track.albumCover} alt={track.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{track.title}</h3>
              <p className="text-gray-600">{track.artist}</p>
              <p className="text-sm text-indigo-600 mt-2">Haz clic para ver letra 🎵</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className={`px-4 py-2 rounded bg-indigo-600 text-white disabled:bg-indigo-300`}
        >
          Anterior
        </button>
        <button
          disabled={topTracks.length < limit}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-2 rounded bg-indigo-600 text-white disabled:bg-indigo-300`}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}

