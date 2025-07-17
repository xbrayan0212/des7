import axios from "axios";
import { Track } from "@/types/Tracks";

export async function searchItunes(artist: string, title: string): Promise<Track | null> {
    try {
        const response = await axios.get(`/api/itunes?artist=${artist}&title=${title}`);
        return response.data;
    } catch (error) {
        console.error("Error al buscar en iTunes (API interna):", error);
        return null;
    }
}