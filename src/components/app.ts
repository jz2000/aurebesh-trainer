import * as writingSystemSwitcher from './writing-system-switcher'
import * as tasks from './tasks'
import * as sessionTasks from './session-tasks'
import * as activeTasks from './active-tasks'
import * as ui from './ui-binding'

const total = {
    tasks : 0,
    hits : 0,
    misses : 0,
    lastHit: new Date(),
    lastMiss: new Date(),
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

export function processCorrectAnswer() {
    ui.flashRightAnswer();
    var currentTask = activeTasks.getCurrentTask();
    currentTask.attempts++;
    currentTask.hits++;
    currentTask.hitsAfterLastMiss++;
    total.tasks++;
    total.hits++;
    total.lastHit = new Date();
}

export function processIncorrectAnswer() {
    ui.flashWrongAnswer();
    var currentTask = activeTasks.getCurrentTask();
    currentTask.attempts++;
    currentTask.misses++;
    currentTask.hitsAfterLastMiss = 0;
    total.tasks++;
    total.misses++;
    total.lastMiss = new Date();
}

export function answerCallback(answer) {
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

export function initialize() {
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

