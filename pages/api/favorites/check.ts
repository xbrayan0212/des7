import { dbConnect } from "@/middlewares/dbConnect";
import { Favorite } from "@/models/Favorite";
import type { NextApiRequest, NextApiResponse } from "next";


//Para validar que si esta en favorite o no la cancion y usar el estado en search/page.tsx
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const { artist, title } = req.query;

    if (!artist || !title) {
      return res.status(400).json({ message: "Faltan parámetros" });
    }

    try {
      const exists = await Favorite.exists({ artist, title });
      return res.status(200).json({ exists: Boolean(exists) });
    } catch (error) {
      console.error("Error en check favoritos:", error);
      return res.status(500).json({ message: "Error interno" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
