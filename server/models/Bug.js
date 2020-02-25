import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bug = new Schema(
  {
    closed: { type: Boolean, default: false },
    description: String,
    title: String,
    reportedBy: String, //The provided name for who reported the bug
    closedDate: Date
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default bug;