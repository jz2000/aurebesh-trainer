export type Task = {
    letter: string;
    attempts: number;
    hits: number;
    misses: number;
    hitsAfterLastMiss: number;
};

let recommendedPoolLength = 4;

const maximumPoolLength = 10;

let taskPool: Task[] = [];

let currentTask: Task = {
    letter: '',
    attempts: 0,
    hits: 0,
    misses: 0,
    hitsAfterLastMiss: 0,
};

export function reset() {
    taskPool = [];
    currentTask = {
        letter: '',
        attempts: 0,
        hits: 0,
        misses: 0,
        hitsAfterLastMiss: 0,
    };
    recommendedPoolLength = 4;
}

export function generateTask(): Task {
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

export function getCurrentTask(): Task {
    return currentTask;
}
