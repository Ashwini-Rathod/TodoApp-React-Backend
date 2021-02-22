const sendError = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");
const sendResponse = require("../helper/sendResponse");

const verifyPostRequest = (req, res, next)=>{
    const requiredProperties = ["taskName"];
    let result = requiredProperties.every((key)=>{
        return req.body[key];
    })
    console.log("Result", result);
    if(!result){
        return sendError(
            new AppError(401, "Unsuccesssul", "Invalid Input"),
            req,
            res,
          );
    }
    else{
        next();

    }
}

module.exports.verifyPostRequest = verifyPostRequest;