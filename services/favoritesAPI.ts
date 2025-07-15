import axios from "axios";
import { Track } from "@/types/Tracks";

export async function getFavorites(): Promise<Track[]> {
    const response = await axios.get("/api/favorites");
    return response.data;
}

export async function addFavorite(data: Track): Promise<Track> {
    const response = await axios.post("/api/favorites", data);
    return response.data;
}

export async function deleteFavorite(id: string): Promise<void> {
    await axios.delete(`/api/favorites/${id}`);
}
