export type AbtTask = {
    letter: string;
    attempts: number;
    hits: number;
    misses: number;
    hitsAfterLastMiss: number;
    lastAnswer: string;
    lastAnswerStatus: AbtTaskAnswerStatus;
};

export type AbtTaskAnswerStatus = 'correct' | 'incorrect' | 'idle';

export type AbtSession = {
    totalAttempts : number,
    totalHits : number,
    totalMisses : number,
    lastHit: Date,
    lastMiss: Date,
    currentTask: AbtTask;
    lastTask: AbtTask | null;
};

export type AbtUiLanguage = 'aurebesh' | 'high_galactic';
