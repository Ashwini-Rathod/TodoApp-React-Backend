const faker = require("faker");
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    taskId: {
        type: String,
        default: faker.random.uuid,
    },
    taskName: {
        type: String,
        validate:{
            validator : function (taskName){
                return this.taskName.trim().length;
            },
        },
        message: "Task name cannot be an empty string",     
    },
    status: {
        type: String,
        default: "Not started",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startedAt: {
        type: Date,
        default: undefined,
    },
    completedAt: {
        type: Date,
        default: undefined,
    },
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;


