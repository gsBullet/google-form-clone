const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json("user not authorized");
    }
    const decodeToken = jwt.verify(
      token,
      "3e9b2825-cfe3-422e-8177-bac1b129a320"
    );

    if (decodeToken) {
      req.userData = decodeToken;
      next();
    }
  } catch (error) {
    return res.status(401).json("user not authorized");
  }
};
module.exports = authMiddleware;
