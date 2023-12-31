import { Task } from './active-tasks';

export function Letter(letter): Task {
    return {
        letter : letter,
        attempts : 0,
        hits : 0,
        misses : 0,
        hitsAfterLastMiss :0
    };
}
