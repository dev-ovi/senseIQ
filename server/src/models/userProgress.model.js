module.exports = (sequelize, DataTypes) => {
  const UserProgress = sequelize.define(
    "UserProgress",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      answers: {
        type: DataTypes.JSONB, // Store user answers to questions
        defaultValue: [],
      },
      timeSpent: {
        type: DataTypes.INTEGER, // Time spent in seconds
        defaultValue: 0,
      },
      completedAt: {
        type: DataTypes.DATE,
      },
      accuracy: {
        type: DataTypes.FLOAT, // Percentage of correct answers
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  return UserProgress;
};
