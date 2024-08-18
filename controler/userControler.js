const { userModel } = require("../db");
const AuthenticationError = require("../exception/AuthenticationError");
const { createToken } = require("../util/jwtToken");
const { tryCatchWrapper } = require("../util/tryCatchWrapper");

exports.authenticateUserLogin = tryCatchWrapper(async (req, res) => {
  const creds = req.body;
  const {
    email = "",
    password = "",
    _id,
    role,
  } = (await userModel.findOne({ email: creds?.username })) || {};

  if (!email) throw new AuthenticationError(404, "User Not Found");
  if (creds.password !== password)
    throw new AuthenticationError(401, "Wrong Password");

  const token = createToken({ email, password, role, userID: _id });
  return res.status(200).json({ message: `Welcome ${email}`, token });
});

exports.handleUserSignUp = tryCatchWrapper(async (req, res) => {
  const data = req.body;
  const { email = "", password = "" } =
    (await userModel.findOne({ email: data?.username })) || {};
  if (email) throw new AuthenticationError(409, "User Already Exists");

  const addNewUser = new userModel({
    email: data.username,
    password: data.password,
    name: data.name,
    role: data.role,
  });
  await addNewUser.save();
  return res.status(200).json({ message: `Welcome ${data?.username}` });
});
