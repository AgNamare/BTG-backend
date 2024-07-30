const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define schema for institution
const institutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  courses: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: [String],
  },
});

// Create model from schema
const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;
