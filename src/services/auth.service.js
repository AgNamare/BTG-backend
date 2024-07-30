const User = require("../models/user.model.js");
const { userExists, generateToken } = require("../utils/userUtils.js");
const bcrypt = require("bcrypt");
// const { generateVerificationCode, sendVerificationCode } = require("../utils/verificationUtils.js");

// const Cart = require("../models/cart.model.js");

const createUser = async (userData) => {
  const { password, phoneNumber, ...rest } = userData;

  try {
    if (!(await userExists(phoneNumber))) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        ...rest,
        password: hashedPassword,
        phoneNumber,
      });
      await newUser.save();
      const { password: pass, ...user } = newUser.toObject();
      return user;
    } else {
      throw new Error("User already exists");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Verifies a user by matching the verification code with the user's stored verification code.
 *
 * @param {string} phoneNumber - The phone number of the user to verify.
 * @param {string} code - The verification code to match.
 * @return {Promise<object>} The user object if verification is successful, otherwise an error.
 */
// const verifyUser = async (phoneNumber, code) => {
//   console.log(phoneNumber);
//   try {
//     const user = await User.findOne({ phoneNumber });
//     if (user) {
//       if (user.verificationCode === code) {
//         return user;
//       } else {
//         throw new Error("Invalid verification code");
//       }
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const updateUser = async (data) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber: data.phoneNumber },
      data,
      {
        new: true,
      }
    );
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

const resetPassword = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      throw new Error("User not found");
    }
    // const code = generateVerificationCode();
    user.verificationCode = code;
    await user.save();
    // await sendVerificationCode(`+254${phoneNumber}`, code);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePassword = async (phoneNumber, password) => {
  try {
    const user = await User.findOne({ phoneNumber });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Failed to update password");
  }
};

const logIn = async (email, password) => {
  console.log(email, password);
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      console.log("User does not exist");
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      console.log("Invalid Password");
      throw new Error("Invalid Credentials");
    }
    const {
      password: userPassword,
      // verificationCode,
      ...user
    } = existingUser.toObject();
    const token = generateToken(existingUser);
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

// const resendOtp = async (phoneNumber) => {
//   try {
//     console.log(phoneNumber);
//     const user = await User.findOne({ phoneNumber });
//     console.log(user);
//     const code = generateVerificationCode();
//     user.verificationCode = code;
//     await user.save();
//     await sendVerificationCode(`+254${phoneNumber}`, code);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

module.exports = {
  createUser,
  updateUser,
  resetPassword,
  updatePassword,
  logIn,
  // verifyUser,
  // resendOtp,
};
