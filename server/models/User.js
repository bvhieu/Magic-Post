const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: [
        "leader",
        "region_manager",
        "point_manager",
        "region_staff",
        "point_staff",
      ],
    },
    region: {
      type: String,
      required: [true, "Region is required"],
    },
    point: {
      type: String,
      required: [true, "Point is required"],
    },
    status: {
      type: String,
      default: "Active",
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: true,
    },
    verifiedAt: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.checkPassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
