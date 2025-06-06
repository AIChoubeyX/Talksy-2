import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

//apply to all endpoints
router.use(protectRoute)

router.get("/",getRecomendedUsers);
router.get("/friends", getMyFriends)

export default router;
