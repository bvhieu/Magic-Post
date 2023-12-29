const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");

const register = async (req, res) => {
  const { name, email, password, region, point, role } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new CustomError.BadRequestError("Email already in use");
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    region,
    point,
    verificationToken,
  });

  // await sendVerificationEmail({
  //   name: user.name,
  //   email: user.email,
  //   verificationToken: user.verificationToken,
  // });

  res.status(200).json({
    msg: "Success creating account.",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Missing Email or password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please verify you email");
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = "";

  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.json(tokenUser);
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  // two ways to access something from the headers:
  // req.headers['something'] || req.get('something')
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = {
    refreshToken,
    ip,
    userAgent,
    user: user._id,
  };
  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.json(tokenUser);
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({
    user: req.user.userId,
  });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(204).json({ msg: "Logged out!" });
};

const removeAccount = async (req, res) => {
  const { email } = req.body;

  const result = await User.deleteOne({ email });
  if (result.deletedCount > 0) {
    res.status(204).json({ msg: "Delete account successfully." });
  } else {
    res.status(410).json({ msg: "Failed to delete account." });
  }


};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
    });

    const tenMinutes = 1000 * 60 * 10; // in milliseconds
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  // we send that msg anyway incase the user exists or not, to make our app more secure
  // attackers may know what emails I have in my db, if we didn't do it that way
  res.json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      // Remember: hashing is a one way street
      // that's why we compare the hashed(token) with the hashed one in db
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  // We still sends 200 even if user is not exist; more secure
  res.json({ msg: "Password reset!" });
};

module.exports = {
  register,
  // verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  removeAccount
};
