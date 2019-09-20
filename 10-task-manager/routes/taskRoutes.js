const express = require('express'),
    router = express.Router(),
    taskService = require('../services/taskService');

router.get('/', (req, res, next) => {
    res.json(taskService.getAll());
});

router.get('/:id', (req, res, next) => {
    const taskId = parseInt(req.params.id),
        result = taskService.get(taskId);
    if (result){
        res.json(result);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req, res, next) => {
    const taskData = req.body;
    const newTask = taskService.addNew(taskData);
    res.status(201).json(newTask);
})

router.put('/:id', (req, res, next) => {
    const taskIdToUpdate = parseInt(req.params.id),
        updatedTaskData = req.body;
    const updatedTask = taskService.update(taskIdToUpdate, updatedTaskData);
    if (updatedTask){
        res.json(updatedTask);
    } else {
        res.status(404).end();
    }
})

router.delete('/:id', (req, res, next) => {
    const taskIdToDelete = parseInt(req.params.id);
    if (taskService.remove(taskIdToDelete)){
        res.json(null);
    } else {
        res.status(404).end();
    }
});

module.exports = router;