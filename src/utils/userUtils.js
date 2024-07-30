const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const secretKey = require("../configs/jwtConfigs.js");

// Check if a user exists by phone number
const userExists = async (phoneNumber) => {
  try {
    const existingUser = await User.findOne({ phoneNumber });
    return !!existingUser; // Return true if user exists, otherwise false
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false; // Return false if there was an error
  }
};

// Generate JWT token for a given user
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber // Ensure this property matches your schema
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

module.exports = {
  userExists,
  generateToken
};
