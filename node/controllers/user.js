const User = require('../models/User');
const jwt = require('jsonwebtoken');
const addUser = async (req, res) => {
    try {
        let user = await new User(req.body);
        await user.save();
        let token = jwt.sign({ name: user.name, password: user.password }, 'secret')
        res.status(200).json({ user: user, token: token });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}

const getUser = async (req, res) => {
    try {
        let user = await User.findOne({ "name": req.body.name, "password": req.body.password });
        let token = jwt.sign({ "name": user.name, "password": user.password }, 'secret'); if (user) {
            res.status(200).json({ user: user, token: token });
        }
        else
            res.status(404).json({ message: "No user found!!!" })
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}
const getTasksToUser = async (req, res) => {
    try{
         let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret');
    }
    catch(err){
        res.status(401).json({ message:"error verify" })
    }
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
