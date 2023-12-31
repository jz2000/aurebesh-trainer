import React from 'react';
import styles from '@/styles/Home.module.css'

export type AbtLearningProgressPanelProps = {

};

export const AbtLearningProgressPanel = (props: AbtLearningProgressPanelProps): React.ReactElement => {
    return (
        <div className={styles['b-status']}>
            <div className={styles['b-status__caption']}>
                <span>Progress</span>
            </div>
            <div className={styles['b-status__container']}>
                <div className={styles['p-status__to-learn']}>
                    <div className={styles['p-status__to-learn__caption']}>To Learn</div>
                    <div id="js-letters-to-learn">
                    </div>
                </div>
                <div className={styles['p-status__in-learning']}>
                    <div className={styles['p-status__in-learning__caption']}>Learning</div>
                    <div id="js-letters-in-learning">
                    </div>
                </div>
                <div className={styles['p-status__well-learnt']}>
                    <div className={styles['p-status__well-learnt__caption']}>Learnt</div>
                    <div id="js-letters-well-learnt">
                    </div>
                </div>
            </div>
        </div>
    );
};
