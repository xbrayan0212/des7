// /models/Favorite.ts
import mongoose, { Schema, models, model } from "mongoose";

const FavoriteSchema = new Schema({
    title: String,
    artist: String,
    albumCover: String,
    previewUrl: String,
    lyrics: String,
});

export const Favorite = models.Favorite || model("Favorite", FavoriteSchema);
