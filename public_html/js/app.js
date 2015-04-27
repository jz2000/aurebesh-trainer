define([], function() {
    "use strict";

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
    'W', 'X', 'Y', 'Z',
    'TH', 'SH', 'OO', 'KH', 'NG', 'CH', 'EO', 'AE',
    '0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9'/*,
    ',', '.', '?', '!', ':', ';', ' ', '"', '`', "'", '(', ')', '/', '$' */ 
];

var recommendedPoolLength = 4;

var maximumPoolLength = 10;

var lettersPool = [];

var taskPool = [];

var currentTask = [];

var total = {
    tasks : 0,
    hits : 0,
    misses : 0
};

function Letter(letter) {
    return {
        letter : letter,
        attempts : 0,
        hits : 0,
        misses : 0,
        hitsAfterLastMiss :0
    };
}

function generateTask() {
    var nextTask = currentTask;
    while (nextTask === currentTask) {
        var taskIndex = Math.floor((Math.random() * taskPool.length));
        nextTask = taskPool[taskIndex];
    }
    currentTask = nextTask;
    var taskPlace = document.querySelector('#task-place');
    taskPlace.textContent = currentTask.letter;
    var answerForm = document.querySelector('#answer-form');
    //answerForm.dataset.answer = letter;
    var answerNode = document.querySelector('#answer');
    answerNode.value = '';
    answerNode.focus();
}

function resetStatistics() {
    lettersPool = [];
    for (var i = 0; i < letters.length; i++) {
        lettersPool.push(Letter(letters[i]));
    }
}

function findWorstLetter() {
    var lettersNotInPool = filterOutPool(lettersPool);
    var worstRatio = findWorstRatio(lettersNotInPool);
    var worstLetters = collectWorstLetters(lettersNotInPool, worstRatio);
    var letterIndex = Math.floor((Math.random() * worstLetters.length));
    return worstLetters[letterIndex];
}

function findWorstRatio(letters) {
    var worstRatio = Math.abs(Math.max());
    for (var i = 0; i < letters.length; i++) {
        var letter = letters[i];
        var ratio = letter.hitsAfterLastMiss;
        if (worstRatio > ratio) {
            worstRatio = ratio;
        }
    }
    return worstRatio;
}

function collectWorstLetters(letters, worstRatio) {
    var result = [];
    for (var i = 0; i < letters.length; i++) {
        var letter = letters[i];
        var ratio = letter.hitsAfterLastMiss;
        if (ratio <= worstRatio) {
            result.push(letter);
        }
    }
    return result;
}

function filterOutPool(worstLetters) {
    var result = [];
    for (var i = 0; i < worstLetters.length; i++) {
        var letter = worstLetters[i];
        if (taskPool.indexOf(letter) < 0) {
            result.push(letter);
        }
    }
    return result;
}

function restoreTaskPool() {
    while (taskPool.length < recommendedPoolLength) {
        var task = findWorstLetter();
        taskPool.push(task);
    }
}

function switchToHighGalactic() {
    var page = document.querySelector('.b-page');
    page.classList.remove('b-page_system_aurebesh');
    page.classList.add('b-page_system_high-galactic');
    var linkHg = document.querySelector('#js-language-high-galactic');
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkHg.classList.add('b-language__link_active_yes');
    linkAurebesh.classList.remove('b-language__link_active_yes');
}

function switchToAurebesh() {
    var page = document.querySelector('.b-page');
    page.classList.add('b-page_system_aurebesh');
    page.classList.remove('b-page_system_high-galactic');
    var linkHg = document.querySelector('#js-language-high-galactic');
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkHg.classList.remove('b-language__link_active_yes');
    linkAurebesh.classList.add('b-language__link_active_yes');
}

function wireUpLanguageSwitch() {
    var linkHg = document.querySelector('#js-language-high-galactic');
    linkHg.addEventListener('click', function(e) {
        switchToHighGalactic();
    });
    var linkAurebesh = document.querySelector('#js-language-aurebesh');
    linkAurebesh.addEventListener('click', function(e) {
        switchToAurebesh()();
    });
}

function renderResult(task, answer) {
    var explAb = document.querySelector('#js-answer-explanation__aub');
    explAb.textContent = task;
    var explHg = document.querySelector('#js-answer-explanation__hg');
    explHg.textContent = answer;
}

function renderTotal() {
   var totalTasksNode = document.querySelector('#js-total-tasks');
   totalTasksNode.textContent = total.tasks;
   var totalHitsNode = document.querySelector('#js-total-hits');
   totalHitsNode.textContent = total.hits;
   var totalMissesNode = document.querySelector('#js-total-misses');
   totalMissesNode.textContent = total.misses;
}

function flashRightAnswer() {
    var node = document.querySelector('.b-answer-indicator');
    node.classList.add('p-answer-indicator__right');
    node.classList.remove('p-answer-indicator__wrong');
    var textNode = document.querySelector('#js-answer-text');
    textNode.textContent = 'Correct';
//    setTimeout(function() {
//        node.classList.add('p-answer-indicator__right__active_no');
//        node.classList.remove('p-answer-indicator__right__active_yes');
//    }, 500);
}

function flashWrongAnswer() {
    var node = document.querySelector('.b-answer-indicator');
    node.classList.remove('p-answer-indicator__right');
    node.classList.add('p-answer-indicator__wrong');
    var textNode = document.querySelector('#js-answer-text');
    textNode.textContent = 'Miss';
//    setTimeout(function() {
//        node.classList.add('p-answer-indicator__wrong__active_no');
//        node.classList.remove('p-answer-indicator__wrong__active_yes');
//    }, 1500);
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


function collectWellLearntLetters() {
    var result = [];
    for (var i = 0; i < lettersPool.length; i++) {
        var letter = lettersPool[i];
        if (letter.hitsAfterLastMiss >= 20) {
            result.push(letter);
        }
    }
    return result;
}

function collectLettersToLearn() {
    var result = [];
    for (var i = 0; i < lettersPool.length; i++) {
        var letter = lettersPool[i];
        if (letter.hitsAfterLastMiss < 20) {
            result.push(letter);
        }
    }
    return result;
}

function renderTemplate(templateName, letter) {
    var template = document.getElementById(templateName).innerHTML;
    var html = template
        .replace(/{{letter.letter}}/g, letter.letter)
        .replace(/{{letter.hits}}/g, letter.hits)
        .replace(/{{letter.misses}}/g, letter.misses)
        .replace(/{{letter.hitsAfterLastMiss}}/g, letter.hitsAfterLastMiss);
    var resultNode = document.createElement('span');
    resultNode.innerHTML = html;
    return resultNode; 
};


function renderWellLearntLetters() {
    var wellLearntLetters = collectWellLearntLetters();
    var node = document.querySelector('#js-letters-well-learnt');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    for (var i = 0; i < wellLearntLetters.length; i++) {
        var letter = wellLearntLetters[i];
        var letterNode = document.createElement('div');
        var letterTemplate = renderTemplate('js-letter-template', letter);
        letterNode.appendChild(letterTemplate);
        node.appendChild(letterNode);
    }
}

function renderTaskPool() {
    var node = document.querySelector('#js-letters-in-learning');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    for (var i = 0; i < taskPool.length; i++) {
        var letter = taskPool[i];
        var letterNode = document.createElement('div');
        var letterTemplate = renderTemplate('js-letter-template', letter);
        letterNode.appendChild(letterTemplate);
        node.appendChild(letterNode);
    }
}

function renderLettersToLearn() {
    var letterToLearn = collectLettersToLearn();
    var node = document.querySelector('#js-letters-to-learn');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    for (var i = 0; i < letterToLearn.length; i++) {
        var letter = letterToLearn[i];
        var letterNode = document.createElement('div');
        var letterTemplate = renderTemplate('js-letter-template', letter);
        letterNode.appendChild(letterTemplate);
        node.appendChild(letterNode);
    }
}

function renderStatus() {
    renderWellLearntLetters();
    renderTaskPool();
    renderLettersToLearn();
}

function wireUpForm() {
    var form = document.querySelector('#answer-form');
    form.addEventListener('submit', submitForm);
}

function submitForm(e) {
   e.preventDefault();
   var answerNode = document.querySelector('#answer');
   var answer = answerNode.value.trim();
   if (answer) {
        var correctAnswer = currentTask.letter;
        var hg = (total.tasks < 100);
        if (answer.toUpperCase() === correctAnswer.toUpperCase()) {
            flashRightAnswer();
            currentTask.attempts++;
            currentTask.hits++;
            currentTask.hitsAfterLastMiss++;
            total.tasks++;
            total.hits++;
            total.lastHit = new Date();
        } else {
            flashWrongAnswer();
            currentTask.attempts++;
            currentTask.misses++;
            currentTask.hitsAfterLastMiss = 0;
            total.tasks++;
            total.misses++;
            total.lastMiss = new Date();
        }
        checkPoolRust();
        checkPoolExpansion();
        restoreTaskPool();
        renderResult(correctAnswer, correctAnswer);
        renderTotal();
        renderStatus();
        if (hg && (total.tasks >= 100)) {
            switchToAurebesh();
        }
        generateTask();
   } else {
       //show warning
   }
}

return {
    wireUpLanguageSwitch: wireUpLanguageSwitch,
    switchToHighGalactic: switchToHighGalactic,
    resetStatistics: resetStatistics,
    restoreTaskPool: restoreTaskPool,
    renderStatus: renderStatus,
    generateTask: generateTask,
    renderResult: renderResult,
    currentTask: currentTask,
    wireUpForm: wireUpForm
};

});

