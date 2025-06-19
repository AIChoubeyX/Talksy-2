// backend/controllers/aiChat.controller.js
import AiChat from "../models/AiChat.model.js";

// GET /api/ai/chat → return history for this user
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id; // comes from auth middleware
    const doc = await AiChat.findOne({ userId }).lean();
    res.json(doc?.messages || []);
  } catch (error) {
    console.error("Error getting chat history:", error);
    res.status(500).json({ error: "Failed to retrieve chat history" });
  }
};

// POST /api/ai/chat → stores prompt + AI response from frontend
export const postChatMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res
        .status(400)
        .json({ error: "Both prompt and response are required" });
    }

    const newMessages = [
      { role: "user", content: prompt },
      { role: "assistant", content: response },
    ];

    await AiChat.findOneAndUpdate(
      { userId },
      { $push: { messages: { $each: newMessages } } },
      { upsert: true }
    );

    res.status(201).json({ success: true, messages: newMessages });
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ error: "Failed to save chat message" });
  }
};
