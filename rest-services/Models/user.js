const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    UserId: {
      type: Number,
    },
    UserName: {
      type: String,
    },
    Email: {
      type: String,
    },
    PhoneNo: {
      type: Number,
    },
    Role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
