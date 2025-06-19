// import { generateStreamToken } from "../lib/stream.js";

// export async function getStreamToken(req, res) {
//   try {
//     // Simulate token generation logic
//    const token = generateStreamToken(req.user.id)
//     res.status(200).json({ token });    
//   } catch (error) {
//     console.error("Error generating token:", error);
//     res.status(500).json({ error: "Failed to generate token" });
//   }  
// }

// controllers/chat.controller.js
import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // ✅ Correct - await the async function
    const token = await generateStreamToken(req.user.id);
    
    console.log('Token received in controller:', token);
    console.log('Token type in controller:', typeof token);
    
    res.status(200).json({ token });    
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }  
}