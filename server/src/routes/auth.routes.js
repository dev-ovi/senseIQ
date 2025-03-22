const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Register new user
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

// Get current user (protected route)
router.get("/me", authMiddleware, authController.getCurrentUser);

module.exports = router;
