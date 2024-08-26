function requiredUser(req, res, next) {
  if (!res.locals.user) {
    return res.status(403).json({ message: "Forbidden" });
  }
  return next();
}

module.exports = { requiredUser }