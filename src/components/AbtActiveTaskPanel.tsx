import React from 'react';
import styles from '@/styles/Home.module.css'

export type AbtActiveTaskPanelProps = {

};

export const AbtActiveTaskPanel = (props: AbtActiveTaskPanelProps): React.ReactElement => {
    return (
        <div className={styles['b-active-task']}>
            <div className={styles['b-active-task__caption']}>
                <span>Current Task</span>
            </div>
            <div className={styles['b-active-task__container']}>
                <div className={styles['b-active-task__card']}>
                    <span id="task-place" className={styles['b-active-task__symbol']}>
                        A
                    </span>
                </div>
                <div className={styles['b-active-task__answer']}>
                    <div>
                        <form id="answer-form">
                            <label htmlFor="answer" className={styles['b-active-task__answer__label']}>Answer &gt;</label>
                            <input type="text" id="answer" autoComplete="off" size="2" className={styles['b-active-task__answer__input']} />
                            <button type="submit" className={styles['b-active-task__answer__button']}>OK</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
