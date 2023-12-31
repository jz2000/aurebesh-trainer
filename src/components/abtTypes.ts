export type AbtTask = {
    letter: string;
    attempts: number;
    hits: number;
    misses: number;
    hitsAfterLastMiss: number;
};

export type AbtTaskAnswerStatus = 'correct' | 'incorrect' | 'idle';

export type AbtSession = {
    tasks : number,
    hits : number,
    misses : number,
    lastHit: Date,
    lastMiss: Date,
};

export type AbtUiLanguage = 'aurebesh' | 'high_galactic';
