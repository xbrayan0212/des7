import { dbConnect } from "@/middlewares/dbConnect";
import { Favorite } from "@/models/Favorite";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === "DELETE") {
        try {
            await Favorite.findByIdAndDelete(id);
            return res.status(200).json({ message: "Favorito eliminado" });
        } catch (error) {
            console.error("Error al eliminar favorito:", error);
            return res.status(500).json({ message: "Error al eliminar favorito" });
        }
    }

    res.status(405).end();
}
