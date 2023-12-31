import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
// import { useAbtSession } from '../components/abtSession';
import { AbtUiLanguageControl } from '../components/AbtUiLanguageControl';
import { AbtUiLanguage } from '../components/abtTypes';

export default function Home() {
  const [abtUiLanguage, setAbtUiLanguage] = useState<AbtUiLanguage>('high_galactic');
  // const abtSession = useAbtSession();

  return (
    <>
      <Head>
        <title>Aurebesh Trainer</title>
        <meta name="description" content="Helps start understanding Aurebesh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles['b-page']} ${abtUiLanguage === 'aurebesh' ? styles['b-page_system_aurebesh'] : styles['b-page_system_high-galactic']}`}>
        <AbtUiLanguageControl currentAbtUiLanguage={abtUiLanguage} onChangeAbtUiLanguage={setAbtUiLanguage} />

        <div className={styles['b-page-header']}>Aurebesh Trainer</div>

        <div className={styles['b-game-field']}>
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

        </div>

        <div className={styles['b-font-sample__aurebesh']}>
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className={styles['b-font-sample__aurebesh_inv']}>
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className={styles['b-font-sample__aurebesh_tech']}>
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className={styles['b-font-sample__aurebesh_tech_inv']}>
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className={styles['b-font-sample__aurebesh_inverted_capitals']}>
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>
      </main>
    </>
  )
}
