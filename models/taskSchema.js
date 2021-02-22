//mongoose schema
const uniqid = require("uniqid");
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref: "users"
    },
    taskId: {
        type: String,
        default: uniqid(),
    },
    taskName: {
        type: String,
        validate:{
            validator : function (taskName){
                // console.log("this is task validator", this);
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

// taskSchema.virtual('timeTaken', function(){
//     return (completedAt - startedAt);
// })

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;


