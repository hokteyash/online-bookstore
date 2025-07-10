export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "You are not authorized" });
  }
  next();
};
