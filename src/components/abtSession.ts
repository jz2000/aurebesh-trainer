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

const filterOutPool = (programTaskPool: AbtTask[], immediateTaskPool: AbtTask[]) => {
    const result = [];
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
    const result = [];
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
    const currentTask = selectNextTask(immediateTaskPool, previousTask.current);

    const checkPoolRust = () => {
        const result = [];
        immediateTaskPool.forEach((task) => {
            if (task.hitsAfterLastMiss < 20) {
                result.push(task);
            }
        });
        setImmediateTaskPool(result);
    }

    const refillTaskPool = (): void  => {
        const immediateTaskPoolCopy = immediateTaskPool;
        while (immediateTaskPoolCopy.length < recommendedImmediatePoolLength) {
            const worstLearnedTask = findWorstLearnedTask(programTaskPool, immediateTaskPool);
            if (worstLearnedTask) {
                immediateTaskPoolCopy.push(worstLearnedTask);
            } else {
                console.log('Empty task detected, activeTasks:', immediateTaskPoolCopy);
                console.log('Empty task detected, sessionTasks:', programTaskPool);
                alert('Hello, the impossible error has happend. Check the console.');
            }
        }
        setImmediateTaskPool(immediateTaskPoolCopy);
    }

    const checkImmediatePoolExpansion = () => {
        if (immediateTaskPool.length < recommendedImmediatePoolLength) {
            return;
        }
        const allImmediateTasksLearned = immediateTaskPool.every((task) => (task.hitsAfterLastMiss >= 10));
        if (allImmediateTasksLearned && recommendedImmediatePoolLength < maximumPoolLength) {
            setRecommendedImmediatePoolLength(recommendedImmediatePoolLength + 1);
        }
    }

    const lastTask = previousTask.current;

    previousTask.current = currentTask;

    return {
        totalAttempts,
        totalHits,
        totalMisses,
        lastHit,
        lastMiss,
        lastTask,
        currentTask,
    };
}
