import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useAbtSession } from '../components/abtSession';
import { AbtUiLanguageControl } from '../components/AbtUiLanguageControl';
import { AbtUiLanguage } from '../components/abtTypes';
import { AbtActiveTaskPanel } from '../components/AbtActiveTaskPanel';
import { AbtSessionStatsPanel } from '../components/AbtSessionStatsPanel';
import { AbtLearningProgressPanel } from '../components/AbtLearningProgressPanel';

export default function Home() {
  const [abtUiLanguage, setAbtUiLanguage] = useState<AbtUiLanguage>('high_galactic');
  const abtSession = useAbtSession();

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
          <AbtActiveTaskPanel />

          <AbtSessionStatsPanel
              totalAttempts={abtSession.totalAttempts}
              totalHits={abtSession.totalHits}
              totalMisses={abtSession.totalMisses}
              lastTaskLetter={abtSession.lastTask?.letter || abtSession.currentTask.letter}
              lastTaskAnswer={abtSession.lastTask?.lastAnswer || '?'}
              lastTaskAnswerStatus={abtSession.lastTask?.lastAnswerStatus || 'idle'}
          />

          <AbtLearningProgressPanel />

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
