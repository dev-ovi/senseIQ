module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      questionType: {
        type: DataTypes.ENUM(
          "multiple-choice",
          "true-false",
          "matching",
          "fill-blank",
          "audio",
          "image",
          "video"
        ),
        defaultValue: "multiple-choice",
      },
      options: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
      correctAnswer: {
        type: DataTypes.JSONB, // Could be a single value or array depending on question type
        allowNull: false,
      },
      mediaUrl: {
        type: DataTypes.STRING, // URL to image, audio, or video if applicable
      },
      explanation: {
        type: DataTypes.TEXT, // Explanation of the correct answer
      },
      pointsValue: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      timeLimit: {
        type: DataTypes.INTEGER, // Time limit in seconds for this specific question
        defaultValue: 30,
      },
      difficultyLevel: {
        type: DataTypes.ENUM("easy", "medium", "hard", "expert"),
        defaultValue: "medium",
      },
      orderIndex: {
        type: DataTypes.INTEGER, // For ordering questions within a quiz
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  return Question;
};
