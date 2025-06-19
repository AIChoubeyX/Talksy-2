// backend/routes/aiChat.route.js
import express from "express";
import { getChatHistory, postChatMessage } from "../controllers/aiChat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);  // ✅ your middleware

router.get("/", getChatHistory);
router.post("/", postChatMessage);

export default router;
