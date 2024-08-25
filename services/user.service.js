const { omit } = require("lodash");
const User = require("../models/User");

async function validateUser(email, password) {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return false;
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return false;
    }
    return omit(user.toJSON(), "password");
  } catch (error) {
    return false;
  }
}

async function createUser(input) {
  try {
    const user = await User.create(input);
    return omit(user.toJSON(), "password");
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { createUser, validateUser }