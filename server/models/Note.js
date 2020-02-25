import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const note = new Schema(
  {
    content: String,
    bug: { type: ObjectId, ref: "Bug", required: true },
    reportedBy: String, //The provided name for who made the note
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default note;