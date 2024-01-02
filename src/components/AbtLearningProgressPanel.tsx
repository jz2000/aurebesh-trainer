import React from 'react';
import styles from '@/styles/AbtLearningProgressPanel.module.css'
import { AbtTask } from './abtTypes';
import { WELL_LEARNT_HITS_THRESHOLD } from './abtSession';

export type AbtLearningProgressPanelProps = {
    programTaskPool: AbtTask[];
    immediateTaskPool: AbtTask[];
};

const determineTasksToLearn = (programTaskPool: AbtTask[]): AbtTask[] => {
    const result: AbtTask[] = [];
    programTaskPool.forEach((task) => {
        if (task.hitsAfterLastMiss < WELL_LEARNT_HITS_THRESHOLD) {
            result.push(task);
        }
    });
    return result;
}

const determineWellLearntTasks = (programTaskPool: AbtTask[]): AbtTask[] => {
    const result: AbtTask[] = [];
    programTaskPool.forEach((task) => {
        if (task.hitsAfterLastMiss >= WELL_LEARNT_HITS_THRESHOLD) {
            result.push(task);
        }
    });
    return result;
}

export const AbtLearningProgressPanel = (props: AbtLearningProgressPanelProps): React.ReactElement => {
    const tasksToLearn = determineTasksToLearn(props.programTaskPool);
    const wellLearntTasks = determineWellLearntTasks(props.programTaskPool);
    const tasksInLearning = props.immediateTaskPool;
    return (
        <div className={styles.b_status}>
            <div className={styles.b_status__caption}>
                <span>Progress</span>
            </div>
            <div className={styles.b_status__container}>
                <div className={styles.p_status__to_learn}>
                    <div className={styles.p_status__to_learn__caption}>To Learn</div>
                    <div id="js-letters-to-learn" className={styles.b_status__letterset}>
                        {tasksToLearn.map((task) => (<span key={task.letter} className={styles.b_status__letter}>{task.letter}</span>))}
                    </div>
                </div>
                <div className={styles.p_status__in_learning}>
                    <div className={styles.p_status__in_learning__caption}>Learning</div>
                    <div id="js-letters-in-learning" className={styles.b_status__letterset}>
                        {tasksInLearning.map((task) => (<span key={task.letter} className={styles.b_status__letter}>{task.letter}</span>))}
                    </div>
                </div>
                <div className={styles.p_status__well_learnt}>
                    <div className={styles.p_status__well_learnt__caption}>Learnt</div>
                    <div id="js-letters-well-learnt" className={styles.b_status__letterset}>
                        {wellLearntTasks.map((task) => (<span key={task.letter} className={styles.b_status__letter}>{task.letter}</span>))}
                    </div>
                </div>
            </div>
        </div>
    );
};
