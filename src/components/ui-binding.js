import styles from '@/styles/Home.module.css'

export function renderResult(task, answer) {
    var explAb = document.querySelector('#js-answer-explanation__aub');
    explAb.textContent = task;
    var explHg = document.querySelector('#js-answer-explanation__hg');
    explHg.textContent = answer;
}

export function renderTotal(total) {
   var totalTasksNode = document.querySelector('#js-total-tasks');
   totalTasksNode.textContent = total.tasks;
   var totalHitsNode = document.querySelector('#js-total-hits');
   totalHitsNode.textContent = total.hits;
   var totalMissesNode = document.querySelector('#js-total-misses');
   totalMissesNode.textContent = total.misses;
}

export function flashRightAnswer() {
    var node = document.querySelector(`.${styles['b-answer-indicator']}`);
    node.classList.add(styles['p-answer-indicator__right']);
    node.classList.remove(styles['p-answer-indicator__wrong']);
    var textNode = document.querySelector('#js-answer-text');
    textNode.textContent = 'Correct';
//    setTimeout(function() {
//        node.classList.add('p-answer-indicator__right__active_no');
//        node.classList.remove('p-answer-indicator__right__active_yes');
//    }, 500);
}

export function flashWrongAnswer() {
    var node = document.querySelector(`.${styles['b-answer-indicator']}`);
    node.classList.remove(styles['p-answer-indicator__right']);
    node.classList.add(styles['p-answer-indicator__wrong']);
    var textNode = document.querySelector('#js-answer-text');
    textNode.textContent = 'Miss';
//    setTimeout(function() {
//        node.classList.add('p-answer-indicator__wrong__active_no');
//        node.classList.remove('p-answer-indicator__wrong__active_yes');
//    }, 1500);
}

function renderTemplate(templateName, letter) {
    // var template = document.getElementById(templateName).innerHTML;
    var template = `
          <span className={styles['b-status__letter']}>[[letter.letter]]</span>
          <span>[[letter.hits]]</span>
          <span>[[letter.misses]]</span>
          <span>[[letter.hitsAfterLastMiss]]</span>
    `;
    var html = template
        .replace(/\[\[letter.letter\]\]/g, letter.letter)
        .replace(/\[\[letter.hits\]\]/g, letter.hits)
        .replace(/\[\[letter.misses\]\]/g, letter.misses)
        .replace(/\[\[letter.hitsAfterLastMiss\]\]/g, letter.hitsAfterLastMiss);
    var resultNode = document.createElement('span');
    resultNode.innerHTML = html;
    return resultNode;
};


export function renderWellLearntLetters(wellLearntLetters) {
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

export function renderTaskPool(taskPool) {
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

export function renderLettersToLearn(letterToLearn) {
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

export function renderCurrentTask(currentTask) {
    var taskPlace = document.querySelector('#task-place');
    taskPlace.textContent = currentTask.letter;
    var answerForm = document.querySelector('#answer-form');
    //answerForm.dataset.answer = letter;
    var answerNode = document.querySelector('#answer');
    answerNode.value = '';
    answerNode.focus();
}

export function wireUpForm(answerCallback) {
    var form = document.querySelector('#answer-form');
    form.addEventListener('submit', function submitForm(e) {
        e.preventDefault();
        var answerNode = document.querySelector('#answer');
        var answer = answerNode.value.trim();
        answerCallback(answer);
    });
}

export function finishSession() {
    alert('Session Finished');
    location.reload();
}
