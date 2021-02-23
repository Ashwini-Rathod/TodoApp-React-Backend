const sendError = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");

const verifyPostRequest = (req, res, next) => {
  const requiredProperties = ["taskName"];
  let result = requiredProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    return sendError(
      new AppError(401, "Unsuccesssul", "Invalid Input"),
      req,
      res
    );
  } else {
    next();
  }
};

const verfiyTaskName = (req, res, next) => {
  let regex = /^[A-Za-z0-9 _]*$/;
  let task = req.body.taskName;
  if (!regex.test(task) || task.trim() == "") {
    return sendError(
      new AppError(501, "Unsuccesful", "Invalid Input"),
      req,
      res
    );
  }
  next();
};



module.exports.verifyPostRequest = verifyPostRequest;
module.exports.verfiyTaskName = verfiyTaskName;
