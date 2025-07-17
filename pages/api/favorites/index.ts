// /pages/api/favorites/index.ts
import { dbConnect } from "@/middlewares/dbConnect";
import { Favorite } from "@/models/Favorite";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    //Para listar todas las canciones favoritas en la ruta de /favorites
    if (req.method === "GET") {
        const favorites = await Favorite.find();
        return res.status(200).json(favorites);
    }

   if (req.method === "POST") {
    const { artist, title, lyrics, albumCover, previewUrl } = req.body;

    if (!artist || !title) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    try {
      // Buscar si ya existe la canción en favoritos
      const existing = await Favorite.findOne({ artist, title });

      if (existing) {
        return res.status(409).json({ message: "Canción ya está en favoritos" });
      }

      // Crear nuevo favorito
      const newFavorite = new Favorite({ artist, title, lyrics, albumCover, previewUrl });
      await newFavorite.save();

      return res.status(201).json({ message: "Favorito agregado", favorite: newFavorite });
    } catch (error) {
      console.error("Error al guardar favorito:", error);
      return res.status(500).json({ message: "Error interno" });
    }
  }


    res.status(405).end();
}
