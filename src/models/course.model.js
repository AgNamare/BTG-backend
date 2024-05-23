import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  institutions: Array,
});

export default mongoose.model("Course", courseSchema);
