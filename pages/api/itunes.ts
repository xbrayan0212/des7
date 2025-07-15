import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { artist, title } = req.query;
    const query = `${artist} ${title}`;

    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await axios.get(`https://itunes.apple.com/search?term=${encodedQuery}&entity=song&limit=1`);
        const results = response.data.results;

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No encontrado" });
        }

        const song = results[0];

        return res.status(200).json({
            title: song.trackName,
            artist: song.artistName,
            albumCover: song.artworkUrl100,
            previewUrl: song.previewUrl,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error buscando en iTunes" });
    }
}
