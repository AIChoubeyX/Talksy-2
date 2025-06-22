// import User from "../models/User.js";

// export const updateUser = async (req, res) => {
//   const userId = req.params.id;
//   const updates = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update profile", error });
//   }
// };

import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js"; // ✅ make sure this is imported

export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ user ID from auth middleware
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Update in Stream Chat as well
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`✅ Stream user updated for ${updatedUser.fullName}`);
    } catch (streamErr) {
      console.error("❌ Stream update failed:", streamErr);
      // Don't fail the whole request if Stream update fails
    }

    // ✅ Only respond once, after all updates
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error("❌ Error updating user profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
