const Task = require('../models/Task');
const User = require('../models/User');
const addTask = async (req, res) => {
    try {
        let completed;
        if (req.body.completed == "")
            completed = false;
        let user = await User.findById(req.body.userId);
        let task = await new Task({ userId: user._id, title: req.body.task.title, completed: completed });
        task.save();
        user.tasks.push(task._id);
        user.save();
        res.status(200).json({ task: task, user: user })
    }
    catch (err) {
        res.status(400).json({ message: err })
    }
}
const updateTask = async (req, res) => {
    try {
        let task = await Task.findByIdAndUpdate(req.params.id, req.body);
        task.save();
        res.status(200).json({ task: task });
    }
    catch (err) {
        res.status(400).json({ message: err })
    }
}
const deleteTask = async (req, res) => {
    try {
        let userTasks = await User.findOne({ _id: req.params.userId }).populate('tasks');
        let userTasksNew = []
        let IndexTask = userTasks.tasks.length;
        for (let i = 0; i < IndexTask; i++) {
            if (userTasks.tasks[i]._id != req.params.taskId)
                userTasksNew.push(userTasks.tasks[i]);
        }
        let user = await User.findById(req.params.userId);
        user.tasks = userTasksNew;
        user.save();
        await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json({ massege: "task deleted!!!" });
    }
    catch (err) {
        res.status(400).json({ message: err })
    }
}
module.exports = { addTask, updateTask, deleteTask }