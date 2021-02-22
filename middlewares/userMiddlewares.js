const User = require("../models/userSchema");
const sendError = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");

const isUserRegistered = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return sendError(
        new AppError(401, "Unsuccesssul", "User not registered"),
        req,
        res
      );
    }
    req.currentUser = { ...user };
    next();
  } catch (err) {
    return sendError(
      new AppError(401, "Unsuccesssul", "Internal Error"),
      req,
      res
    );
  }
};

const checkReqBody = (req, res, next) => {
  let validationArray;
  switch (req.url) {
    case "/signup":
      validationArray = ["username", "email", "password", "confirmPassword"];
      break;
    case "/login":
      validationArray = ["username", "password"];
      break;
    default:
      return sendError(
        new AppError(404, "Unsuccessful", "Invalid Input"),
        req,
        res
      );
  }
  let result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });
  if (!result) {
    return sendError(
      new AppError(404, "Unsuccessful", "Invalid Input"),
      req,
      res
    );
  }
  next();
};
const isEmailUnique = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return sendError(
      new AppError(401, "Unsuccessful", "User already exists"),
      req,
      res
    );
  }
  next();
};

const isUsernameUnique = async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return sendError(
      new AppError(401, "Unsuccessful", "Username already exists"),
      req,
      res
    );
  }
  next();
};

const isEmailValid = (req, res, next) => {
  let regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  let email = req.body.email;
  if (!regexForEmail.test(email)) {
    return sendError(
      new AppError(400, "Unsuccessful", "Invalid Email address"),
      req,
      res
    );
  }
  next();
};

const checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return sendError(
      new AppError(400, "Unsuccessful", "Passwords do not match"),
      req,
      res
    );
  }
  next();
};

module.exports.isUserRegistered = isUserRegistered;
module.exports.checkReqBody = checkReqBody;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.isEmailUnique = isEmailUnique;
module.exports.isEmailValid = isEmailValid;
module.exports.isUsernameUnique = isUsernameUnique;
