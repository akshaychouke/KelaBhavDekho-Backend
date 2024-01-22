const mongoose = require("mongoose");

const kelaGroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.ObjectId,
    ref: "user",
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

const KelaGroup = mongoose.model("KelaGroup", kelaGroupSchema);
module.exports = KelaGroup;
