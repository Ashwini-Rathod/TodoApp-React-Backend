//crud operations on todo...
const Task = require("../models/taskSchema");
const sendError = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");
const sendResponse = require("../helper/sendResponse");

const getAllTasks = async (req, res, next)=>{
    try{
        let queryArray = ["taskName", "taskId", "status"];
        let mongoFilter = {};
        let flag ;
        if(Object.keys(req.query).length !== 0){
            Object.keys(req.query).forEach((key)=>{
                if(queryArray.includes(key)){
                    mongoFilter[key] = req.query[key];
                    flag = true;
                }
            })
            console.log(mongoFilter);
            if(flag){
                const tasks = await Task.find(mongoFilter);
                sendResponse(200, "Successful", [tasks], req, res);
                console.log("testing");
            }
            else{
                sendResponse(200, "Successful", [], req, res);
                console.log(false);
            }
        }
        else{
            let tasks = await Task.find({user: req.currentUser._id});
            sendResponse(200, "Successful", tasks, req, res);
        }     
    }catch(err){
        return sendError(new AppError(401, "Unsuccessful", "Internal Error"),req, res);
    }
}
const createTask = async (req, res, next)=>{
    console.log("CurrentUser:" ,req.currentUser);
    let newTask = new Task({user: req.currentUser._id, taskName: req.body.taskName});
    // console.log("New Task: " , newTask);
    try{
        const task = await newTask.save();
        sendResponse(200, "Successful", [task], req, res);
    }catch(err){
        console.log(err);
        return sendError(new AppError(401, "Unsuccessful", "Internal Error"), req, res);
    }
}
const getTaskById = async (req, res, next)=>{
    try{
        let task = await Task.findOne({taskId: req.params.taskId, user: req.currentUser._id});
        sendResponse(200, "Successful", [task], req, res)
    }catch(err){
        return sendError(new AppError(401, "Unsuccessful", "Internal Error"), req, res);
    }
}
const updateTask = async(req, res, next)=>{
    try{
        if(req.body.status){
            let task = await Task.updateOne({taskId: req.params.taskId, user: req.currentUser._id}, {$set: {status: req.body.status}});
            sendResponse(200, "Successful", [task], req, res)  
        }
        else{
            return sendError(new AppError(401, "Unsuccessful", "Invalid request"), req, res);
        }
    }
    catch(err){
        return sendError(new AppError(401, "Unsuccessful", "Internal Error"), req, res);
    }
}
const deleteTask = async (req, res, next)=>{
    try{
        let task = await Task.deleteOne({taskId: req.params.taskId, user: req.currentUser._id});
        sendResponse(200, "Successful", [task], req, res)
    }
    catch(err){
        return sendError(new AppError(401, "Unsuccessful", "Internal Error"), req, res);
    }
}
module.exports.getAllTasks = getAllTasks;
module.exports.createTask = createTask;
module.exports.getTaskById = getTaskById;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;

