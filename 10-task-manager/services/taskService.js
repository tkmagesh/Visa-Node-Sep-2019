const taskDb = require('./taskDb');
let taskList = [
    {id : 1, name : 'Learn JavaScript', isCompleted : false},
    {id : 2, name : 'Master Node.js', isCompleted : true},
    {id : 3, name : 'Plan vacation', isCompleted : false},
];


function getAll(){
    return taskDb.getData();
}

async function get(taskId){
    // return taskDb
    //     .getData()
    //     .then(taskList => taskList.find(task => task.id === taskId))

      const taskList = await taskDb.getData();
      return taskList.find(task => task.id === taskId);
}

async function addNew(taskData){
    // return taskDb
    //     .getData()
    //     .then(taskList => {
    //         const newTaskId = taskList.reduce((result, task) => task.id > result ?  task.id : result, 0) + 1,
    //             newTask = { ...taskData, id : newTaskId};
    //         taskList.push(newTask);
    //         return taskDb
    //             .saveData(taskList)
    //             .then(() => newTask);
    //     })

    
        const taskList = await taskDb.getData();
        const newTaskId = taskList.reduce((result, task) => task.id > result ?  task.id : result, 0) + 1,
                newTask = { ...taskData, id : newTaskId};
        taskList.push(newTask);
        await taskDb.saveData(taskList);
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