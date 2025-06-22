// import express from 'express';
// import { protectRoute } from '../middleware/auth.middleware.js';
// import { getRecomendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs } from '../controllers/user.controller.js';
// import { updateUser } from '../controllers/settings.controller.js';

// const router = express.Router();

// //apply to all endpoints
// router.use(protectRoute)

// router.get("/",getRecomendedUsers);
// router.get("/friends", getMyFriends)

// router.post("/friend-request/:id", sendFriendRequest);
// router.put("/friend-request/:id/accept", acceptFriendRequest);

// router.get("/friend-requests", getFriendRequests);
// router.get("/outgoing-friend-requests", getOutgoingFriendReqs);
 
// // Update user profile(settings)
// router.put('/update/:id', updateUser);

// export default router;


import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getRecomendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
} from '../controllers/user.controller.js';

import { updateUser } from '../controllers/settings.controller.js';
import { getUserProfile } from "../controllers/auth.controller.js"; // 👈 add if needed

const router = express.Router();

router.use(protectRoute); // ✅ All routes secured

router.get("/", getRecomendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

// ✅ New endpoints
router.get("/profile", getUserProfile);          // 👈 For fetching current user
router.put("/update-profile", updateUser);       // 👈 For updating own profile

export default router;

