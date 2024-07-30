const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
});

module.exports = mongoose.model("Course", courseSchema);
