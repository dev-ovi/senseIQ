const { Quiz, Question, Category, User, UserProgress } = require("../models");
const { Op } = require("sequelize");

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const {
      categoryId,
      difficultyLevel,
      search,
      limit = 10,
      offset = 0,
      sortBy = "createdAt",
      order = "DESC",
    } = req.query;

    // Build filter conditions
    const whereConditions = {
      isPublic: true,
    };

    if (categoryId) {
      whereConditions.categoryId = categoryId;
    }

    if (difficultyLevel) {
      whereConditions.difficultyLevel = difficultyLevel;
    }

    if (search) {
      whereConditions[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Find quizzes
    const quizzes = await Quiz.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Category,
          attributes: ["id", "name", "icon"],
        },
        {
          model: User,
          as: "creator",
          attributes: ["id", "username", "profilePicture"],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order]],
      distinct: true,
    });

    return res.status(200).json({
      total: quizzes.count,
      quizzes: quizzes.rows,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(quizzes.count / limit),
    });
  } catch (error) {
    console.error("Get all quizzes error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Get single quiz
exports.getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { includeQuestions } = req.query;

    const include = [
      {
        model: Category,
        attributes: ["id", "name", "icon"],
      },
      {
        model: User,
        as: "creator",
        attributes: ["id", "username", "profilePicture"],
      },
    ];

    // Only include questions if specifically requested (for quiz taking)
    if (includeQuestions === "true") {
      include.push({
        model: Question,
        order: [["orderIndex", "ASC"]],
      });
    }

    const quiz = await Quiz.findByPk(quizId, {
      include,
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    // Increment play count if viewing for playing
    if (includeQuestions === "true") {
      await quiz.update({
        playCount: quiz.playCount + 1,
      });
    }

    return res.status(200).json({
      quiz,
    });
  } catch (error) {
    console.error("Get quiz by ID error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Create new quiz
exports.createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      difficultyLevel,
      categoryId,
      questions,
      timeLimit,
      isPublic,
    } = req.body;

    // Create quiz
    const quiz = await Quiz.create({
      title,
      description,
      difficultyLevel,
      categoryId,
      timeLimit,
      isPublic,
      creatorId: req.userId,
    });

    // Create questions if provided
    if (questions && Array.isArray(questions) && questions.length > 0) {
      // Add quizId to each question
      const questionsWithQuizId = questions.map((question, index) => ({
        ...question,
        quizId: quiz.id,
        orderIndex: index,
      }));

      await Question.bulkCreate(questionsWithQuizId);
    }

    return res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    console.error("Create quiz error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Update quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const {
      title,
      description,
      difficultyLevel,
      categoryId,
      timeLimit,
      isPublic,
    } = req.body;

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    // Check if user is the creator or an admin
    if (quiz.creatorId !== req.userId && req.userRole !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to update this quiz",
      });
    }

    // Update quiz
    await quiz.update({
      title: title || quiz.title,
      description: description || quiz.description,
      difficultyLevel: difficultyLevel || quiz.difficultyLevel,
      categoryId: categoryId || quiz.categoryId,
      timeLimit: timeLimit || quiz.timeLimit,
      isPublic: typeof isPublic === "boolean" ? isPublic : quiz.isPublic,
    });

    return res.status(200).json({
      message: "Quiz updated successfully",
      quiz,
    });
  } catch (error) {
    console.error("Update quiz error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    // Check if user is the creator or an admin
    if (quiz.creatorId !== req.userId && req.userRole !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to delete this quiz",
      });
    }

    // Delete quiz (will cascade delete questions)
    await quiz.destroy();

    return res.status(200).json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.error("Delete quiz error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Submit quiz answers
exports.submitQuizAnswers = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.userId;

    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: Question,
          attributes: ["id", "correctAnswer", "pointsValue"],
        },
      ],
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    // Calculate score
    let score = 0;
    let correctCount = 0;

    // Process each answer
    const userAnswers = [];
    quiz.Questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);

      if (userAnswer) {
        const isCorrect =
          JSON.stringify(userAnswer.answer) ===
          JSON.stringify(question.correctAnswer);
        userAnswers.push({
          questionId: question.id,
          userAnswer: userAnswer.answer,
          isCorrect,
        });

        if (isCorrect) {
          score += question.pointsValue;
          correctCount++;
        }
      }
    });

    // Calculate accuracy
    const accuracy =
      quiz.Questions.length > 0
        ? (correctCount / quiz.Questions.length) * 100
        : 0;

    // Create or update user progress
    const [userProgress, created] = await UserProgress.findOrCreate({
      where: {
        userId,
        quizId,
      },
      defaults: {
        score,
        answers: userAnswers,
        timeSpent,
        completed: true,
        completedAt: new Date(),
        accuracy,
      },
    });

    // If progress already exists, update it only if new score is higher
    if (!created && userProgress.score < score) {
      await userProgress.update({
        score,
        answers: userAnswers,
        timeSpent,
        completed: true,
        completedAt: new Date(),
        accuracy,
      });
    }

    // Update user points
    const user = await User.findByPk(userId);
    if (user) {
      // Only add points if this is a new completion or the score is higher
      if (created || userProgress.score < score) {
        const pointsToAdd = created ? score : score - userProgress.score;
        await user.update({
          points: user.points + pointsToAdd,
        });

        // Check if level up is needed (every 1000 points)
        const newLevel = Math.floor(user.points / 1000) + 1;
        if (newLevel > user.level) {
          await user.update({ level: newLevel });
        }
      }
    }

    return res.status(200).json({
      message: "Quiz submitted successfully",
      result: {
        score,
        accuracy,
        correctCount,
        totalQuestions: quiz.Questions.length,
        timeSpent,
      },
    });
  } catch (error) {
    console.error("Submit quiz answers error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};
