const express = require("express");
const {
  createUserHandler,
  logInHandler,
  resetPasswordHandler,
  updatePasswordHandler,
  // resendOtpHandler,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/sign-up", createUserHandler);
router.post("/sign-in", logInHandler);
router.post("/reset-password", resetPasswordHandler);
router.put("/update-password", updatePasswordHandler);

module.exports = router;
