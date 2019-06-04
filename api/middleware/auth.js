const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/constants");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("apiKey");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
