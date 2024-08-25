require("dotenv").config();
const { HTTP_STATUS, HTTP_MESSAGES } = require("../constants");
const { createUser, validateUser } = require("../services/user.service");
const { signJwt } = require("../utils/jwt.utils");
const { errorResponse } = require("../utils/responses");
const { validationResult } = require('express-validator');

exports.signInHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, HTTP_STATUS.BAD_REQUEST, HTTP_MESSAGES.BAD_REQUEST, { errors: errors.array() });
    }
    const user = await validateUser(req.body.email, req.body.password);
    if (!user) {
      return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, HTTP_MESSAGES.UNAUTHORIZED, { message: "Unauthorized" });
    }
    const accessToken = signJwt(user, {
      expiresIn: process.env.ACCESS_TOKEN_TTL
    });
    const refreshToken = signJwt(user, {
      expiresIn: process.env.REFRESH_TOKEN_TTL,
    });
    return res.status(200).json({ accessToken, refreshToken });

  } catch (error) {
    console.log(error);
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, HTTP_MESSAGES.INTERNAL_SERVER_ERROR, {
      message: "Something went wrong!",
    });
  }
}

exports.signUpHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, HTTP_STATUS.BAD_REQUEST, HTTP_MESSAGES.BAD_REQUEST, { errors: errors.array() });
    }
    const createdUser = await createUser(req.body);
    const accessToken = signJwt(createdUser, {
      expiresIn: process.env.ACCESS_TOKEN_TTL
    });
    const refreshToken = signJwt(createdUser, {
      expiresIn: process.env.REFRESH_TOKEN_TTL,
    });
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, HTTP_MESSAGES.INTERNAL_SERVER_ERROR, { message: "Something went wrong!" });
  }
}