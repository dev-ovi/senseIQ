module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      difficultyLevel: {
        type: DataTypes.ENUM("easy", "medium", "hard", "expert"),
        defaultValue: "medium",
      },
      thumbnail: {
        type: DataTypes.STRING,
        defaultValue: "default-quiz-image.png",
      },
      timeLimit: {
        type: DataTypes.INTEGER, // Time limit in seconds
        defaultValue: 600, // Default 10 minutes
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      playCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      timestamps: true,
    }
  );

  return Quiz;
};
