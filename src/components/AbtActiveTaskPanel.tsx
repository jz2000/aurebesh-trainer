import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

export type AbtActiveTaskPanelProps = {
    currentTaskLetter: string;
    onSubmitAnswer: (answer: string) => void;
};

export const AbtActiveTaskPanel = (props: AbtActiveTaskPanelProps): React.ReactElement => {
    const [answerValue, setAnswerValue] = useState<string>('');

    useEffect(() => {
        setAnswerValue('');
    }, [props.currentTaskLetter]);

    const onUpdateAnswerValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAnswerValue(event.currentTarget.value);
    };

    const onSubmitAnswerValue = (event: React.FormEvent): void => {
        event.preventDefault();
        props.onSubmitAnswer(answerValue);
    };

    return (
        <div className={styles['b-active-task']}>
            <div className={styles['b-active-task__caption']}>
                <span>Current Task</span>
            </div>
            <div className={styles['b-active-task__container']}>
                <div className={styles['b-active-task__card']}>
                    <span id="task-place" className={styles['b-active-task__symbol']}>
                        {props.currentTaskLetter}
                    </span>
                </div>
                <div className={styles['b-active-task__answer']}>
                    <div>
                        <form id="answer-form" action="POST" onSubmit={onSubmitAnswerValue}>
                            <label htmlFor="answer" className={styles['b-active-task__answer__label']}>Answer &gt;</label>
                            <input
                                type="text"
                                id="answer"
                                autoComplete="off"
                                size={2}
                                className={styles['b-active-task__answer__input']}
                                value={answerValue}
                                onInput={onUpdateAnswerValue}
                            />
                            <button type="submit" className={styles['b-active-task__answer__button']}>OK</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
