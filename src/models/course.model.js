import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
});

export default mongoose.model("Course", courseSchema);
