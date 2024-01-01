import { useState, useMemo, useRef } from 'react';
import { AbtSession, AbtTask } from './abtTypes';
import { getAllLetters } from './abtLetters';

const maximumPoolLength = 10;

const selectNextTask = (taskPool: AbtTask[], previousTask: AbtTask | null): AbtTask => {
    while (true) {
        const taskIndex = Math.floor((Math.random() * taskPool.length));
        const nextTask = taskPool[taskIndex];
        if (nextTask !== previousTask) {
            return nextTask;
        }
    }
};

const letterToTask = (letter: string): AbtTask => ({
    letter,
    attempts: 0,
    hits: 0,
    misses: 0,
    hitsAfterLastMiss: 0,
    lastAnswer: '',
    lastAnswerStatus: 'idle',
});

const generateProgramTaskPool = (): AbtTask[] => {
    const allLetters = getAllLetters();
    return allLetters.map((letter) => letterToTask(letter));
}

const filterOutPool = (programTaskPool: AbtTask[], immediateTaskPool: AbtTask[]): AbtTask[] => {
    const result: AbtTask[] = [];
    programTaskPool.forEach((task) => {
        if (immediateTaskPool.indexOf(task) < 0) {
            result.push(task);
        }
    });
    return result;
}

const findWorstRatio = (tasks: AbtTask[]): number => {
    let worstRatio = Number.MAX_VALUE;
    tasks.forEach((task) => {
        const ratio = task.hitsAfterLastMiss;
        if (ratio < worstRatio) {
            worstRatio = ratio;
        }
    });
    return worstRatio;
}

const collectWorstLearnedTasks = (taskPool: AbtTask[], worstRatio: number): AbtTask[] => {
    const result: AbtTask[] = [];
    taskPool.forEach((task) =>  {
        const ratio = task.hitsAfterLastMiss;
        if (ratio <= worstRatio) {
            result.push(task);
        }
    });
    return result;
}

const findWorstLearnedTask = (programTaskPool: AbtTask[], immediateTaskPool: AbtTask[]): AbtTask => {
    const lettersNotInPool = filterOutPool(programTaskPool, immediateTaskPool);
    const worstRatio = findWorstRatio(lettersNotInPool);
    const worstLetters = collectWorstLearnedTasks(lettersNotInPool, worstRatio);
    const letterIndex = Math.floor((Math.random() * worstLetters.length));
    return worstLetters[letterIndex];
}

const initializeImmediateTaskPool = (programTasks: AbtTask[], recommendedImmediatePoolLength: number): AbtTask[] => {
    const result: AbtTask[] = [];
    while (result.length < recommendedImmediatePoolLength) {
        const randomProgramTaskIndex = Math.floor((Math.random() * programTasks.length));
        const randomlySelectedTask = programTasks[randomProgramTaskIndex];
        result.push(randomlySelectedTask);
    }
    return result;
};

const checkPoolRust = (existingImmediateTaskPool: AbtTask[]): AbtTask[] => {
    const result: AbtTask[] = [];
    existingImmediateTaskPool.forEach((task) => {
        if (task.hitsAfterLastMiss < 20) {
            result.push(task);
        }
    });
    return result;
}

const checkImmediatePoolExpansion = (existingImmediateTaskPool: AbtTask[], recommendedImmediatePoolLength: number): number => {
    if (existingImmediateTaskPool.length < recommendedImmediatePoolLength) {
        return recommendedImmediatePoolLength;
    }
    const allImmediateTasksLearned = existingImmediateTaskPool.every((task) => (task.hitsAfterLastMiss >= 10));
    if (allImmediateTasksLearned && recommendedImmediatePoolLength < maximumPoolLength) {
        return recommendedImmediatePoolLength + 1;
    }
    return recommendedImmediatePoolLength;
}

const refillTaskPool = (programTaskPool: AbtTask[], existingImmediateTaskPool: AbtTask[], recommendedImmediatePoolLength: number): AbtTask[]  => {
    while (existingImmediateTaskPool.length < recommendedImmediatePoolLength) {
        const worstLearnedTask = findWorstLearnedTask(programTaskPool, existingImmediateTaskPool);
        if (worstLearnedTask) {
            existingImmediateTaskPool.push(worstLearnedTask);
            continue;
        }
        console.log('Empty task detected, activeTasks:', existingImmediateTaskPool);
        console.log('Empty task detected, sessionTasks:', programTaskPool);
        alert('Hello, the impossible error has happend. Check the console.');
    }
    return existingImmediateTaskPool;
}

export const useAbtSession = (): AbtSession => {
    const programTaskPool = useMemo<AbtTask[]>(() => generateProgramTaskPool(), []);
    const [recommendedImmediatePoolLength, setRecommendedImmediatePoolLength] = useState<number>(4);
    const [immediateTaskPool, setImmediateTaskPool] = useState<AbtTask[]>(initializeImmediateTaskPool(programTaskPool, recommendedImmediatePoolLength));
    const [totalAttempts, setTotalAttempts] = useState<number>(0);
    const [totalHits, setTotalHits] = useState<number>(0);
    const [totalMisses, setTotalMisses] = useState<number>(0);
    const [lastHit, setLastHit] = useState<Date>(new Date());
    const [lastMiss, setLastMiss] = useState<Date>(new Date());
    const previousTask = useRef<AbtTask | null>(null);
    const [lastTask, setLastTask] = useState<AbtTask | null>(null);
    const currentTask = selectNextTask(immediateTaskPool, lastTask);

    const submitCurrentTaskAnswer = (answer: string): void => {
        const sanitizedAnswer = answer.toUpperCase().trim();
        currentTask.lastAnswer = sanitizedAnswer;
        currentTask.lastAnswerStatus = currentTask.letter === sanitizedAnswer ? 'correct' : 'incorrect';
        currentTask.attempts++;
        setTotalAttempts((totalAttempts) => (totalAttempts + 1));
        if (currentTask.lastAnswerStatus === 'correct') {
            currentTask.hits++;
            currentTask.hitsAfterLastMiss++;
            setTotalHits((totalHits) => (totalHits + 1));
            setLastHit(new Date());
        }
        if (currentTask.lastAnswerStatus === 'incorrect') {
            currentTask.misses++;
            currentTask.hitsAfterLastMiss = 0;
            setTotalMisses((totalMisses) => (totalMisses + 1));
            setLastMiss(new Date());
        }
        setLastTask(currentTask);
        const cleanedUpPool = checkPoolRust(immediateTaskPool);
        const newRecommendedPoolSize = checkImmediatePoolExpansion(cleanedUpPool, recommendedImmediatePoolLength);
        const refilledPool = refillTaskPool(programTaskPool, cleanedUpPool, newRecommendedPoolSize);
        setRecommendedImmediatePoolLength(newRecommendedPoolSize);
        setImmediateTaskPool(refilledPool);
    };

    previousTask.current = currentTask;

    return {
        programTaskPool,
        immediateTaskPool,
        totalAttempts,
        totalHits,
        totalMisses,
        lastHit,
        lastMiss,
        lastTask,
        currentTask,
        submitCurrentTaskAnswer,
    };
}
