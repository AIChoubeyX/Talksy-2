import express from "express";
import { translate } from "../controllers/translate.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, translate);

export default router;
