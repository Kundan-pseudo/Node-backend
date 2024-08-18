const jwt = require("jsonwebtoken");
const { tryCatchWrapper } = require("./tryCatchWrapper");
const AuthenticationError = require("../exception/AuthenticationError");
const JWT_SECRET = "secret";

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};
const validateToken = tryCatchWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET);
  const decoded = await jwt.decode(token);
  req.userDetails = decoded;
  next();
});
const validateAdminToken = tryCatchWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET);
  const decoded = await jwt.decode(token);
  const { role } = decoded;
  if (role !== "admin") throw new AuthenticationError(401, "Not an Admin User");
  req.userDetails = decoded;
  next();
});

module.exports = {
  createToken,
  validateToken,
  validateAdminToken,
};
