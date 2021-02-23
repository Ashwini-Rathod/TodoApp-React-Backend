const Task = require("../models/taskSchema");
const sendError = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");
const sendResponse = require("../helper/sendResponse");

const getAllTasks = async (req, res, next) => {
  try {
    let tasks = await Task.find({ user: req.currentUser._id });
    sendResponse(200, "Successful", tasks, req, res);
  } catch (err) {
    return sendError(
      new AppError(401, "Unsuccessful", "Internal Error"),
      req,
      res
    );
  }
};
const createTask = async (req, res, next) => {
  let newTask = new Task({
    user: req.currentUser._id,
    taskName: req.body.taskName,
  });
  try {
    const task = await newTask.save();
    sendResponse(200, "Successful", [task], req, res);
  } catch (err) {
    return sendError(
      new AppError(401, "Unsuccessful", "Internal Error"),
      req,
      res
    );
  }
};
const getTaskById = async (req, res, next) => {
  try {
    let task = await Task.findOne({
      taskId: req.params.taskId,
      user: req.currentUser._id,
    });
    sendResponse(200, "Successful", [task], req, res);
  } catch (err) {
    return sendError(
      new AppError(401, "Unsuccessful", "Internal Error"),
      req,
      res
    );
  }
};
const updateTask = async (req, res, next) => {
  try {
    let taskFound = await Task.find({
      taskId: req.params.taskId,
      user: req.currentUser._id,
    });
    if (taskFound[0].status === "Not started") {
      await Task.findOneAndUpdate(
        { taskId: req.params.taskId, user: req.currentUser._id },
        { status: "Completed" },
        { useFindAndModify: false }
      );
      let tasks = await Task.find({ user: req.currentUser._id });
      sendResponse(200, "Successful", tasks, req, res);
    } else {
      await Task.findOneAndUpdate(
        { taskId: req.params.taskId, user: req.currentUser._id },
        { status: "Not started" },
        { useFindAndModify: false }
      );
      let tasks = await Task.find({ user: req.currentUser._id });
      sendResponse(200, "Successful", tasks, req, res);
    }
  } catch (err) {
    return sendError(
      new AppError(401, "Unsuccessful", "Invalid request"),
      req,
      res
    );
  }
};

const editTask = async(req, res, next) => {
  try{
    // let taskFound = await Task.find({
    //   taskId: req.params.taskId,
    //   user: req.currentUser._id,
    // });
    // console.log(taskFound);
    await Task.findOneAndUpdate(
      { taskId: req.params.taskId, user: req.currentUser._id },
      { taskName: req.body.taskName },
      { useFindAndModify: false }
    );
    let tasks = await Task.find({ user: req.currentUser._id });
    sendResponse(200, "Successful", tasks, req, res);
  }
  catch(err){
    console.log(err);
    return sendError(
      new AppError(401, "Unsuccessful", "Internal Error"),
      req,
      res
    );
  }
}

const deleteTask = async (req, res, next) => {
  try {
    let task = await Task.deleteOne({
      taskId: req.params.taskId,
      user: req.currentUser._id,
    });
    sendResponse(200, "Successful", [task], req, res);
  } catch (err) {
    return sendError(
      new AppError(401, "Unsuccessful", "Internal Error"),
      req,
      res
    );
  }
};
module.exports.getAllTasks = getAllTasks;
module.exports.createTask = createTask;
module.exports.getTaskById = getTaskById;
module.exports.updateTask = updateTask;
module.exports.editTask = editTask;
module.exports.deleteTask = deleteTask;

