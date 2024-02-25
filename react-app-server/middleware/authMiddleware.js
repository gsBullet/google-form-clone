const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("myworld ")) {
      return res.status(401).json("User not authorized");
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("User not authorized");
    }

    const decodeToken = jwt.verify(token, "3e9b2825-cfe3-422e-8177-bac1b129a320");

    if (decodeToken) {
      req.userData = decodeToken;
      next();
    }
  } catch (error) {
    return res.status(401).json("User not authorized");
  }
};

module.exports = authMiddleware;
