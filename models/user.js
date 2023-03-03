const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    nickname: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    access: {
      type: String,
      required: true,
    },
    joined: {
      type: String,
    },
    permission: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
