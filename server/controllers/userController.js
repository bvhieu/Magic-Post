const User = require("../models/User");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json({ count: users.length, users });
};

const getAllManage = async (req, res) => {
  const users = await User.find({
    $or: [{ role: "region_manager" }, { role: "point_manager" }],
  }).select("-password");
  res.json({ count: users.length, users });
};

const getAllRegionStaff = async (req, res) => {
  const { region } = req.body;
  const users = await User.find({
    role: "region_staff",
    region: region
  }).select("-password");
  res.json({ count: users.length, users });
};

const getAllPointStaff = async (req, res) => {
  const users = await User.find({
    role: "point_staff",
  }).select("-password");
  res.json({ count: users.length, users });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }
  checkPermissions({ requestUser: req.user, resourceUserId: user._id });
  res.json({ user });
};

const showCurrentUser = async (req, res) => {
  res.json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide name and email");
  }

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { name, email },
    { runValidators: true, new: true }
  );

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both value");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.checkPassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  user.password = newPassword;
  await user.save();

  res.json({ msg: "Success! password updated" });
};

module.exports = {
  getAllUsers,
  getAllRegionStaff,
  getAllPointStaff,
  getAllManage,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
