const router = require('express').Router();
const task = require('../controllers/task');
const user = require('../controllers/user');
//Task
router.post('/addTask', task.addTask);
router.put('/updateTask/:id', task.updateTask);
router.delete('/deleteTask/:taskId/:userId', task.deleteTask);
//User
router.post('/addUser', user.addUser);
router.post('/getUser', user.getUser);
router.get('/getTasksToUser/:id', user.getTasksToUser);

module.exports = router;