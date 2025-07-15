import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
    throw new Error("Falta la variable de entorno MONGODB_URI");
}

export async function dbConnect() {
    if (mongoose.connection.readyState >= 1) return;

    return mongoose.connect(MONGODB_URI);
}
