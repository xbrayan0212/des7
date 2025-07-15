import axios from "axios";

export async function fetchLyrics(artist: string, title: string): Promise<string> {
    try {
        const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        return response.data.lyrics;
    } catch (error) {
        console.error("Error al buscar letra:", error);
        return "Letra no encontrada.";
    }
}
