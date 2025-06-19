// backend/models/AiChat.model.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const aiChatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    messages: [messageSchema], // entire history for that user
  },
  { timestamps: true }
);

export default mongoose.model("AiChat", aiChatSchema);
