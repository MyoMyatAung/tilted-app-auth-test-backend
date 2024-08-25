const { Router } = require("express");
const { body } = require('express-validator');
const { signUpHandler, signInHandler } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/sign-in", [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], signInHandler);

authRouter.post("/sign-up", [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
], signUpHandler);

module.exports = authRouter;