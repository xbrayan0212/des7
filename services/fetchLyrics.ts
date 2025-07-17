import axios from "axios";

export async function fetchLyrics(artist: string, title: string): Promise<string> {
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    return response.data.lyrics;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Letra no encontrada en la API
      return "⚠️ Letra no encontrada.";
    } else {
      console.error("Error al buscar letra:", error);
      return "Error al obtener la letra.";
    }
  }
}
