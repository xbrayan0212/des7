import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    title: { type: String, required: true },
    lyrics: { type: String, required: true },
    albumCover: { type: String, required: false },
    previewUrl: { type: String, required: false },
}, {
    timestamps: true,
});

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
