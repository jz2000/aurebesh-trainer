define(['session-mem'], function(sessionMem) {
    "use strict";

    var lettersPool = [];

    function resetStatistics(tasks) {
        lettersPool = [];
        var letters = tasks;
        for (var i = 0; i < letters.length; i++) {
            lettersPool.push(sessionMem.Letter(letters[i]));
        }
    }

    function findWorstLetter(activeMems) {
        var lettersNotInPool = filterOutPool(lettersPool, activeMems);
        var worstRatio = findWorstRatio(lettersNotInPool);
        var worstLetters = collectWorstLetters(lettersNotInPool, worstRatio);
        var letterIndex = Math.floor((Math.random() * worstLetters.length));
        return worstLetters[letterIndex];
    }
    
    function filterOutPool(worstLetters, activeMems) {
        var result = [];
        for (var i = 0; i < worstLetters.length; i++) {
            var letter = worstLetters[i];
            if (activeMems.indexOf(letter) < 0) {
                result.push(letter);
            }
        }
        return result;
    }

    function findWorstRatio(letters) {
        var worstRatio = Number.MAX_VALUE;
        for (var i = 0; i < letters.length; i++) {
            var letter = letters[i];
            var ratio = letter.hitsAfterLastMiss;
            if (ratio < worstRatio) {
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

    function getSessionTasks() {
        return lettersPool.slice(0, lettersPool.length);
    }

    return {
        resetStatistics: resetStatistics,
        findWorstLetter: findWorstLetter,
        collectWorstLetters: collectWorstLetters,
        collectWellLearntLetters: collectWellLearntLetters,
        collectLettersToLearn: collectLettersToLearn,
        getSessionTasks: getSessionTasks
    };
});