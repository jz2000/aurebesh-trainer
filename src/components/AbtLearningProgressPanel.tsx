import React from 'react';
import styles from '@/styles/Home.module.css'
import { AbtTask } from './abtTypes';

export type AbtLearningProgressPanelProps = {
    programTaskPool: AbtTask[];
    immediateTaskPool: AbtTask[];
};

const determineTasksToLearn = (programTaskPool: AbtTask[]): AbtTask[] => {
    const result = [];
    programTaskPool.forEach((task) => {
        if (task.hitsAfterLastMiss < 20) {
            result.push(task);
        }
    });
    return result;
}

const determineWellLearntTasks = (programTaskPool: AbtTask[]): AbtTask[] => {
    const result = [];
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
        <div className={styles['b-status']}>
            <div className={styles['b-status__caption']}>
                <span>Progress</span>
            </div>
            <div className={styles['b-status__container']}>
                <div className={styles['p-status__to-learn']}>
                    <div className={styles['p-status__to-learn__caption']}>To Learn</div>
                    <div id="js-letters-to-learn">
                        {tasksToLearn.map((task) => (<span key={task.letter} className={styles['b-status__letter']}>{task.letter}</span>))}
                    </div>
                </div>
                <div className={styles['p-status__in-learning']}>
                    <div className={styles['p-status__in-learning__caption']}>Learning</div>
                    <div id="js-letters-in-learning">
                        {tasksInLearning.map((task) => (<span key={task.letter} className={styles['b-status__letter']}>{task.letter}</span>))}
                    </div>
                </div>
                <div className={styles['p-status__well-learnt']}>
                    <div className={styles['p-status__well-learnt__caption']}>Learnt</div>
                    <div id="js-letters-well-learnt">
                        {wellLearntTasks.map((task) => (<span key={task.letter} className={styles['b-status__letter']}>{task.letter}</span>))}
                    </div>
                </div>
            </div>
        </div>
    );
};
