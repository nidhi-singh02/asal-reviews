const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewId: {
    type: Number,
  },
  UserId: {
    type: Number,
  },
  content: {
    type: String,
  },
  productName: {
    type: String,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  upvoteBy: [{ type: String }], // assign user id
  createdTs: {
    type: Date,
  },
  updateTs: {
    type: Date,
  },
  report: {
    type: String,
  },
  rating: {
    type: Number,
  },
  serviceprovider: {
    type: String,
  },
});

module.exports = mongoose.model("reviewdetails", ReviewSchema);
