const { Category } = require("../models");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "icon"],
      order: [["name", "ASC"]],
    });

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Get all categories error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error:
        process.env.NODE_ENV === "development" ? error.message : "Server error",
    });
  }
};
