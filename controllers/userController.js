const User = require("../models/userSchema");
const sendError = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");
const sendResponse = require("../helper/sendResponse");
const bcrypt = require("bcrypt");
const {getToken} = require("../helper/jwtAuthentication");

const signUpUser = async (req, res, next)=>{
    let newuser = new User({
        email : req.body.email,
        password : req.body.password,
    })
    try{
       let user = await newuser.save();
       sendResponse(200, "Successful", [user], req, res);
    }catch(err){
        sendError(new AppError(401, "Unsuccessful", "Internal Error"), req,res);
    }
}

const loginUser = async(req, res, next)=>{
    console.log(req.currentUser._doc);
    try{
        let compare = await bcrypt.compare(req.body.password, req.currentUser._doc.password);
        if(!compare){
            return sendError(new AppError(401, "Unsuccessful", "Incorrect Password"),req, res);
        }
        let jwtToken = await getToken({ email: req.currentUser._doc.email }, process.env.JWT_SECRET, { expiresIn: "1d"} );
        res.cookie("jwt", jwtToken); 
        sendResponse(200, "Successful", [{jwt: jwtToken}], req, res);

    }
    catch(err){
        return sendError(new AppError(500, "Unsucessful", "Internal Error"),req, res);
    }

}
module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;