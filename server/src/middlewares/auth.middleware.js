const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT tokens
exports.authMiddleware = (req, res, next) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided, authorization denied",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "163aad6634ea277c97bc173f101a8ef0e3f9a458946e28f4f4ac619d6a4ef2e6"
    );

    // Add user ID to request
    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      message: "Token is not valid",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Authentication error",
    });
  }
};

// Middleware to check if user is admin
exports.adminMiddleware = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      message: "Access denied, admin privileges required",
    });
  }
  next();
};
