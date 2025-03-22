const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Import models
const User = require("./user.model")(sequelize, DataTypes);
const Quiz = require("./quiz.model")(sequelize, DataTypes);
const Question = require("./question.model")(sequelize, DataTypes);
const Category = require("./category.model")(sequelize, DataTypes);
const UserProgress = require("./userProgress.model")(sequelize, DataTypes);
const Achievement = require("./achievement.model")(sequelize, DataTypes);

// Define associations
User.hasMany(Quiz, { as: "createdQuizzes", foreignKey: "creatorId" });
Quiz.belongsTo(User, { as: "creator", foreignKey: "creatorId" });

Category.hasMany(Quiz);
Quiz.belongsTo(Category);

Quiz.hasMany(Question);
Question.belongsTo(Quiz);

User.hasMany(UserProgress);
UserProgress.belongsTo(User);
Quiz.hasMany(UserProgress);
UserProgress.belongsTo(Quiz);

User.belongsToMany(Achievement, { through: "UserAchievements" });
Achievement.belongsToMany(User, { through: "UserAchievements" });

module.exports = {
  sequelize,
  User,
  Quiz,
  Question,
  Category,
  UserProgress,
  Achievement,
};
