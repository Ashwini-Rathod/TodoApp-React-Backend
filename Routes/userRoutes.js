const express = require("express");
const router = express.Router();

const { signUpUser, loginUser } = require("../controllers/userController");
const {
  isUserRegistered,
  checkReqBody,
  checkConfirmPassword,
  isEmailUnique,
  isEmailValid,
  isUsernameUnique,
} = require("../middlewares/userMiddlewares");

router
  .route("/signup")
  .post(
    checkReqBody,
    checkConfirmPassword,
    isEmailUnique,
    isEmailValid,
    isUsernameUnique,
    signUpUser
  );

router.route("/login").post(checkReqBody, isUserRegistered, loginUser);

module.exports = router;
