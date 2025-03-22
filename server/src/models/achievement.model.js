module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define(
    "Achievement",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      badge: {
        type: DataTypes.STRING, // Image URL for the badge
        allowNull: false,
      },
      pointsAwarded: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      criteria: {
        type: DataTypes.JSONB, // JSON describing the conditions to unlock this achievement
        allowNull: false,
      },
      tier: {
        type: DataTypes.ENUM("bronze", "silver", "gold", "platinum"),
        defaultValue: "bronze",
      },
      category: {
        type: DataTypes.STRING, // E.g., 'quiz', 'streak', 'social', etc.
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Achievement;
};
