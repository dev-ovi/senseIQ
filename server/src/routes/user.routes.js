const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");

// Get user profile
router.get("/:userId", userController.getUserProfile);

// Update user profile (protected)
router.put("/:userId", authMiddleware, userController.updateUserProfile);

// Get user achievements
router.get("/:userId/achievements", userController.getUserAchievements);

// Get user leaderboard
router.get("/leaderboard", userController.getLeaderboard);

module.exports = router;
