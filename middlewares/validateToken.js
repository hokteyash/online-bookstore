const jwt = require("jsonwebtoken");

export const validateToken = (req, res, next) => {
  try {
    const authHeader =
      req?.headers?.authorization || req?.headers?.Authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Either token is expired or invalid" });
  }
};
