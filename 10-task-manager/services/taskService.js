let taskList = [
    {id : 1, name : 'Learn JavaScript', isCompleted : false},
    {id : 2, name : 'Master Node.js', isCompleted : true},
    {id : 3, name : 'Plan vacation', isCompleted : false},
];

function getAll(){
    return [...taskList];
}

function get(taskId){
    return taskList.find(task => task.id === taskId);
}

function addNew(taskData){
    const newTaskId = taskList.reduce((result, task) => task.id > result ?  task.id : result, 0) + 1,
        newTask = { ...taskData, id : newTaskId};
    taskList.push(newTask);
    return newTask;
}

function update(taskIdToUpdate, updatedTask){
    const taskToUpdate = taskList.find(task => task.id === taskIdToUpdate);
    if (taskToUpdate){
        taskList = taskList.map(task => task.id === taskIdToUpdate ? updatedTask : task);
        return updatedTask;
    } else {
        return null;
    }

}

function remove(taskIdToDelete){
    const taskToDelete = taskList.find(task => task.id === taskIdToDelete);
    if (taskToDelete){
        taskList = taskList.filter(task => task.id !== taskIdToDelete);
        return true;
    } else {
        return false;
    }
}

module.exports = { getAll, get, addNew, update, remove };