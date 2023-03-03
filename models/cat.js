const mongoose = require("mongoose");

const catSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    health: {
      type: String,
      required: true,
    },
    neutered: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    lastSeen: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cat", catSchema);
