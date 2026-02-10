const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    batch: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
