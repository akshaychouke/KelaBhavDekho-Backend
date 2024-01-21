//Middlewares to for auth , isFarmer , isKelaGroup
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed: Invalid token" });
  }
};

const isFarmer = (req, res, next) => {
  const user = req.user;
  
  if (user.role === "farmer") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: Access denied for non-farmers" });
  }
};

const isKelaGroup = (req, res, next) => {
  const user = req.user;

  if (user.role === "kela-group") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: Access denied for non-KelaGroup users" });
  }
};

module.exports = { auth, isFarmer, isKelaGroup };
