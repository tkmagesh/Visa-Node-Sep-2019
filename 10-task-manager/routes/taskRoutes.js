const express = require('express'),
    router = express.Router();

let taskList = [
    {id : 1, name : 'Learn JavaScript', isCompleted : false},
    {id : 2, name : 'Master Node.js', isCompleted : true},
    {id : 3, name : 'Plan vacation', isCompleted : false},
];

router.get('/', (req, res, next) => {
    res.json(taskList);
});

router.get('/:id', (req, res, next) => {
    const result = taskList.find(task => task.id === parseInt(req.params.id));
    if (result){
        res.json(result);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req, res, next) => {
    const taskData = req.body,
        newTaskId = taskList.reduce((result, task) => task.id > result ?  task.id : result, 0) + 1,
        newTask = { ...taskData, id : newTaskId};
    taskList.push(newTask);
    res.status(201).json(newTask);
})

router.put('/:id', (req, res, next) => {
    const taskIdToUpdate = parseInt(req.params.id),
        taskToUpdate = taskList.find(task => task.id === taskIdToUpdate),
        updatedTask = req.body;
    if (taskToUpdate){
        taskList = taskList.map(task => task.id === taskIdToUpdate ? updatedTask : task);
        res.json(updatedTask);
    } else {
        res.status(404).end();
    }
})

router.delete('/:id', (req, res, next) => {
    const taskIdToDelete = parseInt(req.params.id),
        taskToDelete = taskList.find(task => task.id === taskIdToDelete);

    if (taskToDelete){
        taskList = taskList.filter(task => task.id !== taskIdToDelete);
        res.json(null);
    } else {
        res.status(404).end();
    }
});

module.exports = router;