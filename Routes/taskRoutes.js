const express = require("express");
const router = express.Router();
const {getAllTasks, createTask, getTaskById, updateTask, deleteTask} = require("../controllers/taskControllers");
const { verifyPostRequest } = require("../middlewares/taskMiddlewares");

router.route("/tasks").get(getAllTasks).post(verifyPostRequest,createTask);
router.route("/tasks/:taskId").get(getTaskById).patch(updateTask).delete(deleteTask);

module.exports = router;