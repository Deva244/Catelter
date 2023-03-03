const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    petOwner: {
      type: String,
      required: true,
    },
    pets: {
      type: String,
    },
    character: {
      type: String,
    },
    living: {
      type: String,
      required: true,
    },
    children: {
      type: String,
      required: true,
    },
    selectedCat: {
      type: String,
    },
    viewed: {
      type: Boolean,
    },
    recievedAt: {
      type: String,
    },
    handled: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", formSchema);
