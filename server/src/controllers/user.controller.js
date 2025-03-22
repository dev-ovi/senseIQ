const { User, Achievement } = require("../models");

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Achievement,
          through: { attributes: [] }, // Don't include junction table
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Only allow users to update their own profile unless they are an admin
    if (req.userId !== req.params.userId && req.userRole !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to update this profile",
      });
    }

    const { username, bio, profilePicture } = req.body;
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update user
    await user.update({
      username: username || user.username,
      bio: bio || user.bio,
      profilePicture: profilePicture || user.profilePicture,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        level: user.level,
        points: user.points,
      },
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Get user achievements
exports.getUserAchievements = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Achievement,
          through: { attributes: ["createdAt"] }, // Include when the achievement was earned
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      achievements: user.Achievements,
    });
  } catch (error) {
    console.error("Get user achievements error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};

// Get user leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ["id", "username", "profilePicture", "level", "points"],
      order: [["points", "DESC"]],
      limit: 20,
    });

    return res.status(200).json({
      leaderboard,
    });
  } catch (error) {
    console.error("Get leaderboard error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};
