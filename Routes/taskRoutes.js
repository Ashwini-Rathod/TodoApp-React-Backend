const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  editTask,
  deleteTask,
} = require("../controllers/taskControllers");

const {
  verifyPostRequest,
  verfiyTaskName,
} = require("../middlewares/taskMiddlewares");

router
  .route("/tasks")
  .get(getAllTasks)
  .post(verifyPostRequest, verfiyTaskName, createTask);
  
router
  .route("/tasks/:taskId")
  .get(getTaskById)
  .patch(updateTask)
  .put(verfiyTaskName,editTask)
  .delete(deleteTask);

module.exports = router;
