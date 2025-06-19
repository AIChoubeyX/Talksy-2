import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /api/translate
 * Request body: { text: "Hello world", targetLanguage: "Spanish" }
 */
export async function translate(req, res) {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ message: "Both text and targetLanguage are required." });
  }

  try {
    // ✅ Updated model to supported one
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // ✅ Recommended working model
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `
Translate the following sentence to ${targetLanguage}.
After the translation, in a new line that starts with "Grammar:", explain one important grammar point present in the sentence.

Sentence: "${text}"
    `.trim();

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    res.json({ translationBlock: aiText });
  } catch (err) {
    console.error("translate error:", err);
    res.status(500).json({ message: "AI translation failed", error: err.message });
  }
}
