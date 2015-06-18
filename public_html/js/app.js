define(['writing-system-switcher', 'tasks', 'session-tasks', 'active-tasks', 'ui-binding'], 
function(writingSystemSwitcher, tasks, sessionTasks, activeTasks, ui) {
    "use strict";

    var total = {
        tasks : 0,
        hits : 0,
        misses : 0
    };

    function renderStatus() {
        ui.renderWellLearntLetters(sessionTasks.collectWellLearntLetters());
        ui.renderTaskPool(activeTasks.getTaskPool());
        var lettersToLearn = sessionTasks.collectLettersToLearn();
        ui.renderLettersToLearn(lettersToLearn);
        if (lettersToLearn.length === 0) {
            ui.finishSession();
        }
    }
    
    function processCorrectAnswer() {
        ui.flashRightAnswer();
        var currentTask = activeTasks.getCurrentTask();
        currentTask.attempts++;
        currentTask.hits++;
        currentTask.hitsAfterLastMiss++;
        total.tasks++;
        total.hits++;
        total.lastHit = new Date();
    }

    function processIncorrectAnswer() {
        ui.flashWrongAnswer();
        var currentTask = activeTasks.getCurrentTask();
        currentTask.attempts++;
        currentTask.misses++;
        currentTask.hitsAfterLastMiss = 0;
        total.tasks++;
        total.misses++;
        total.lastMiss = new Date();
    }

    function answerCallback(answer) {
       if (answer) {
            var hg = (total.tasks < 100);
            var currentTask = activeTasks.getCurrentTask();
            var correctAnswer = currentTask.letter;
            if (answer.toUpperCase() === correctAnswer.toUpperCase()) {
                processCorrectAnswer();
            } else {
                processIncorrectAnswer();
            }
            activeTasks.checkPoolRust();
            activeTasks.checkPoolExpansion();
            activeTasks.restoreTaskPool(sessionTasks);
            ui.renderResult(correctAnswer, correctAnswer);
            ui.renderTotal(total);
            renderStatus();
            if (hg && (total.tasks >= 100)) {
                writingSystemSwitcher.switchToAurebesh();
            }
            var newTask = activeTasks.generateTask();
            ui.renderCurrentTask(newTask);
       } else {
           //show warning
       }
    }

    function initialize() {
        var mems = tasks.getAllTasks();
        writingSystemSwitcher.wireUpLanguageSwitch();
        writingSystemSwitcher.switchToHighGalactic();
        sessionTasks.resetStatistics(mems);
        activeTasks.reset();
        activeTasks.restoreTaskPool(sessionTasks);
        renderStatus();
        var newTask = activeTasks.generateTask();
        ui.renderCurrentTask(newTask);
        ui.renderResult(newTask.letter, '?');
        ui.wireUpForm(answerCallback);
    }

    return {
        initialize: initialize,
        processCorrectAnswer: processCorrectAnswer,
        processIncorrectAnswer: processIncorrectAnswer,
        answerCallback: answerCallback
    };

});

