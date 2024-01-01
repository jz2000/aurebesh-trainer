import React from 'react';
import styles from '@/styles/AbtLearningprogressPanel.module.css'
import { AbtTask } from './abtTypes';

export type AbtLearningProgressPanelProps = {
    programTaskPool: AbtTask[];
    immediateTaskPool: AbtTask[];
};

const determineTasksToLearn = (programTaskPool: AbtTask[]): AbtTask[] => {
    const result: AbtTask[] = [];
    programTaskPool.forEach((task) => {
        if (task.hitsAfterLastMiss < 20) {
            result.push(task);
        }
    });
    return result;
}

const determineWellLearntTasks = (programTaskPool: AbtTask[]): AbtTask[] => {
    const result: AbtTask[] = [];
    programTaskPool.forEach((task) => {
        if (task.hitsAfterLastMiss >= 20) {
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
                    <div id="js-letters-to-learn">
                        {tasksToLearn.map((task) => (<span key={task.letter} className={styles.b_status__letter}>{task.letter}</span>))}
                    </div>
                </div>
                <div className={styles.p_status__in_learning}>
                    <div className={styles.p_status__in_learning__caption}>Learning</div>
                    <div id="js-letters-in-learning">
                        {tasksInLearning.map((task) => (<span key={task.letter} className={styles.b_status__letter}>{task.letter}</span>))}
                    </div>
                </div>
                <div className={styles.p_status__well_learnt}>
                    <div className={styles.p_status__well_learnt__caption}>Learnt</div>
                    <div id="js-letters-well-learnt">
                        {wellLearntTasks.map((task) => (<span key={task.letter} className={styles.b_status__letter}>{task.letter}</span>))}
                    </div>
                </div>
            </div>
        </div>
    );
};
