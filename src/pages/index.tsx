import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { NoSsr } from '../components/NoSsr';
import { useAbtSession } from '../components/abtSession';
import { AbtUiLanguageControl } from '../components/AbtUiLanguageControl';
import { AbtUiLanguage } from '../components/abtTypes';
import { AbtActiveTaskPanel } from '../components/AbtActiveTaskPanel';
import { AbtSessionStatsPanel } from '../components/AbtSessionStatsPanel';
import { AbtLearningProgressPanel } from '../components/AbtLearningProgressPanel';

export default function Home() {
  const [abtUiLanguage, setAbtUiLanguage] = useState<AbtUiLanguage>('high_galactic');
  const abtSession = useAbtSession();

  useEffect(() => {
    if (abtSession.totalHits > 0 && abtSession.totalHits % 100 === 0 && abtUiLanguage === 'high_galactic') {
      setAbtUiLanguage('aurebesh');
    }
  }, [abtUiLanguage, abtSession.totalHits]);

  return (
    <>
      <Head>
        <title>Aurebesh Trainer</title>
        <meta name="description" content="Helps start understanding Aurebesh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.b_page} ${abtUiLanguage === 'aurebesh' ? styles.b_page_system_aurebesh : styles.b_page_system_high_galactic}`}>
        <AbtUiLanguageControl currentAbtUiLanguage={abtUiLanguage} onChangeAbtUiLanguage={setAbtUiLanguage} />

        <div className={styles.b_page_header}>Aurebesh Trainer</div>

        <NoSsr>
          <div className={styles.b_game_field}>
            <div>
              <AbtActiveTaskPanel
                  currentTaskLetter={abtSession.currentTask.letter}
                  onSubmitAnswer={abtSession.submitCurrentTaskAnswer}
              />
            </div>

            <div>
              <AbtSessionStatsPanel
                  totalAttempts={abtSession.totalAttempts}
                  totalHits={abtSession.totalHits}
                  totalMisses={abtSession.totalMisses}
                  achievedHits={abtSession.achievedHits}
                  necessaryHits={abtSession.necessaryHits}
                  lastTaskLetter={abtSession.lastTask?.letter || abtSession.currentTask.letter}
                  lastTaskAnswer={abtSession.lastTask?.lastAnswer || '?'}
                  lastTaskAnswerStatus={abtSession.lastTask?.lastAnswerStatus || 'idle'}
              />
            </div>

            <div>
              <AbtLearningProgressPanel
                  programTaskPool={abtSession.programTaskPool}
                  immediateTaskPool={abtSession.immediateTaskPool}
              />
            </div>

          </div>

          <div className={styles.b_font_sample__aurebesh}>
            <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
          </div>

          <div className={styles.b_font_sample__aurebesh_inv}>
            <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
          </div>

          <div className={styles.b_font_sample__aurebesh_tech}>
            <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
          </div>

          <div className={styles.b_font_sample__aurebesh_tech_inv}>
            <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
          </div>

          <div className={styles.b_font_sample__aurebesh_inverted_capitals}>
            <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
          </div>
        </NoSsr>
      </main>
    </>
  )
}
