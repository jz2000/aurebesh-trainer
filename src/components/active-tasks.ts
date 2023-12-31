var recommendedPoolLength = 4;

var maximumPoolLength = 10;

var taskPool = [];

var currentTask = {};

export function reset() {
    taskPool = [];
    currentTask = {};
    recommendedPoolLength = 4;
}

export function generateTask() {
    var nextTask = currentTask;
    while (nextTask === currentTask) {
        var taskIndex = Math.floor((Math.random() * taskPool.length));
        nextTask = taskPool[taskIndex];
    }
    currentTask = nextTask;
    return currentTask;
}

export function restoreTaskPool(sessionTasks) {
    while (taskPool.length < recommendedPoolLength) {
        var task = sessionTasks.findWorstLetter(taskPool);
        if (task) {
            taskPool.push(task);
        } else {
            console.log('Empty task detected, activeTasks:', taskPool);
            console.log('Empty task detected, sessionTasks:', sessionTasks);
            alert('Hello, the impossible error has happend. Check the console.');
        }
    }
}

export function checkPoolRust() {
    var result = [];
    for (var i = 0; i < taskPool.length; i++) {
        var task = taskPool[i];
        if (task.hitsAfterLastMiss < 20) {
            result.push(task);
        }
    }
    taskPool = result;
}

export function checkPoolExpansion() {
    if (taskPool.length < recommendedPoolLength) {
        return;
    }
    for (var i = 0; i < taskPool.length; i++) {
        var task = taskPool[i];
        if (task.hitsAfterLastMiss < 10) {
            return;
        }
    }
    if (recommendedPoolLength < maximumPoolLength) {
        recommendedPoolLength++;
    }
}

export function getTaskPool() {
    return taskPool.slice(0, taskPool.length);
}

export function getCurrentTask() {
    return currentTask;
}
