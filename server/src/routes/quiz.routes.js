const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");

// Get all quizzes (public)
router.get("/", quizController.getAllQuizzes);

// Get single quiz (public)
router.get("/:quizId", quizController.getQuizById);

// Create quiz (protected)
router.post("/", authMiddleware, quizController.createQuiz);

// Update quiz (protected)
router.put("/:quizId", authMiddleware, quizController.updateQuiz);

// Delete quiz (protected)
router.delete("/:quizId", authMiddleware, quizController.deleteQuiz);

// Submit quiz answers (protected)
router.post(
  "/:quizId/submit",
  authMiddleware,
  quizController.submitQuizAnswers
);

module.exports = router;
