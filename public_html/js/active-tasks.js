define([], function() {
    "use strict";

    var recommendedPoolLength = 4;

    var maximumPoolLength = 10;

    var taskPool = [];

    var currentTask = {};

    function reset() {
        taskPool = [];
        currentTask = {};
        recommendedPoolLength = 4;
    }

    function generateTask() {
        var nextTask = currentTask;
        while (nextTask === currentTask) {
            var taskIndex = Math.floor((Math.random() * taskPool.length));
            nextTask = taskPool[taskIndex];
        }
        currentTask = nextTask;
        return currentTask;
    }
    
    function restoreTaskPool(sessionTasks) {
        while (taskPool.length < recommendedPoolLength) {
            var task = sessionTasks.findWorstLetter(taskPool);
            taskPool.push(task);
        }
    }

    function checkPoolRust() {
        var result = [];
        for (var i = 0; i < taskPool.length; i++) {
            var task = taskPool[i];
            if (task.hitsAfterLastMiss < 20) {
                result.push(task);
            }
        }
        taskPool = result;
    }

    function checkPoolExpansion() {
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

    function getTaskPool() {
        return taskPool.slice(0, taskPool.length);
    }
    
    function getCurrentTask() {
        return currentTask;
    }

    return {
        reset: reset,
        getTaskPool: getTaskPool,
        generateTask: generateTask,
        getCurrentTask: getCurrentTask,
        restoreTaskPool: restoreTaskPool,
        checkPoolRust: checkPoolRust,
        checkPoolExpansion: checkPoolExpansion
    };
});

