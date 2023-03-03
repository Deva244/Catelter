const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  try {
    // Get token from header
    token = req.cookies.token.token;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    await res.clearCookie("token");
    res.status(401);
    throw new Error("Failed to authorize");
  }

  if (!token) {
    res.status(401);
    throw new Error("Failed to get token | Unauthorized");
  }
});

module.exports = { protect };
