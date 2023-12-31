import React from 'react';
import styles from '@/styles/Home.module.css'

export type AbtSessionStatsPanelProps = {

};

export const AbtSessionStatsPanel = (props: AbtSessionStatsPanelProps): React.ReactElement => {
    return (
        <div className={styles['b-statistics']}>
            <div className={styles['b-statistics__caption']}>
                <span>Result</span>
            </div>
            <div className={styles['b-statistics__container']}>
                <div className={styles['b-statistics__answer']}>
                    <div className={styles['b-answer-indicator']}>
                        <div className={styles['b-answer-indicator__text']} id="js-answer-text">Idle</div>
                        <div className={styles['b-answer-indicator__explanation']} id="js-answer-explanation">
                            <span className={styles['b-answer-indicator__explanation__aub']} id="js-answer-explanation__aub">A</span>
                            =
                            <span className={styles['b-answer-indicator__explanation__hg']} id="js-answer-explanation__hg">?</span>
                        </div>
                    </div>
                </div>
                <div className={styles['b-statistics__totals']}>
                    <div className={styles['b-statistics__row']}>
                        <span className={styles['b-statistics__row-name']}>Attempts </span>
                        <span className={styles['b-statistics__row-value']} id="js-total-tasks">0</span>
                    </div>
                    <div className={styles['b-statistics__row']}>
                        <span className={styles['b-statistics__row-name']}>Hits </span>
                        <span className={styles['b-statistics__row-value']} id="js-total-hits">0</span>
                    </div>
                    <div className={styles['b-statistics__row']}>
                        <span className={styles['b-statistics__row-name']}>Misses </span>
                        <span className={styles['b-statistics__row-value']} id="js-total-misses">0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
