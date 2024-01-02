import React from 'react';
import styles from '@/styles/AbtSessionStatsPanel.module.css'
import { AbtTaskAnswerStatus } from './abtTypes';

export type AbtSessionStatsPanelProps = {
    lastTaskLetter: string;
    lastTaskAnswer: string;
    lastTaskAnswerStatus: AbtTaskAnswerStatus;
    totalAttempts: number;
    totalHits: number;
    totalMisses: number;
};

const determineAnswerIndicatorClass = (answerStatus: AbtTaskAnswerStatus): string => {
    if (answerStatus === 'correct') {
        return styles.p_answer_indicator__right;
    }
    if (answerStatus === 'incorrect') {
        return styles.p_answer_indicator__wrong;
    }
    return '';
};

const determineAnswerIndicatorCopy = (answerStatus: AbtTaskAnswerStatus): string => {
    if (answerStatus === 'correct') {
        return 'Correct';
    }
    if (answerStatus === 'incorrect') {
        return 'Miss';
    }
    return 'Idle';
};

export const AbtSessionStatsPanel = (props: AbtSessionStatsPanelProps): React.ReactElement => {
    return (
        <div className={styles.b_statistics}>
            <div className={styles.b_statistics__caption}>
                <span>Result</span>
            </div>
            <div className={styles.b_statistics__container}>
                <div className={styles.b_statistics__answer}>
                    <div
                        className={`${styles.b_answer_indicator} ${determineAnswerIndicatorClass(props.lastTaskAnswerStatus)}`}
                    >
                        <div id="js-answer-text">
                            {determineAnswerIndicatorCopy(props.lastTaskAnswerStatus)}
                        </div>
                        <div id="js-answer-explanation">
                            <span
                                className={styles.b_answer_indicator__explanation__aub}
                                id="js-answer-explanation__aub"
                            >
                                {props.lastTaskLetter}
                            </span>
                            =
                            <span
                                className={styles.b_answer_indicator__explanation__hg}
                                id="js-answer-explanation__hg"
                            >
                                {props.lastTaskAnswer}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.b_statistics__totals}>
                    <span className={styles.b_statistics__row_name}>Attempts </span>
                    <span className={styles.b_statistics__row_value} id="js-total-tasks">{props.totalAttempts}</span>
                    <span className={styles.b_statistics__row_name}>Hits </span>
                    <span className={styles.b_statistics__row_value} id="js-total-hits">{props.totalHits}</span>
                    <span className={styles.b_statistics__row_name}>Misses </span>
                    <span className={styles.b_statistics__row_value} id="js-total-misses">{props.totalMisses}</span>
                    <span className={styles.b_statistics__row_name}>Accuracy</span>
                    <span className={styles.b_statistics__row_value} id="js-total-accuracy">{props.achievedHits}/{props.necessaryHits}</span>
                </div>
            </div>
        </div>
    );
};
