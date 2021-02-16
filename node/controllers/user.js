const User = require('../models/User');

const addUser = async (req, res) => {
    try {
        let user = await new User(req.body);
        await user.save();
        res.status(200).json({ user: user });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}
const getUser = async (req, res) => {
    try {
        let user = await User.findOne({ "name": req.body.name, "password": req.body.password });
        if (user) {
            res.status(200).json({ user: user });
        }
        else
            res.status(404).json({ message: "No user found!!!" })
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}
const getTasksToUser = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id }).populate('tasks');
        if (user)
            res.status(200).json({ user: user });
        else
            res.status(404).json({ message: "No user found!!!" })
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}
module.exports = { addUser, getUser, getTasksToUser }

