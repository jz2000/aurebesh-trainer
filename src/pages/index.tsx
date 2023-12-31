import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Aurebesh Trainer</title>
        <meta name="description" content="Helps start understanding Aurebesh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="b-page">
        <div className="b-language">
          <div className="b-language__aurebesh">
            <a href="#" className="b-language__link" id="js-language-aurebesh">ab</a>
          </div>
          <div className="b-language__high-galactic">
            <a href="#" className="b-language__link" id="js-language-high-galactic">high galactic</a>
          </div>
        </div>

        <div className="b-page-header">Aurebesh Trainer</div>

        <div className="b-game-field">
          <div className="b-active-task">
            <div className="b-active-task__caption">
              <span>Current Task</span>
            </div>
            <div className="b-active-task__container">
              <div className="b-active-task__card">
                    <span id="task-place" className="b-active-task__symbol">
                        A
                    </span>
              </div>
              <div className="b-active-task__answer">
                <div>
                  <form id="answer-form">
                    <label htmlFor="answer" className="b-active-task__answer__label">Answer &gt;</label>
                    <input type="text" id="answer" autoComplete="off" size="2" className="b-active-task__answer__input" />
                      <button type="submit" className="b-active-task__answer__button">OK</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="b-statistics">
            <div className="b-statistics__caption">
              <span>Result</span>
            </div>
            <div className="b-statistics__container">
              <div className="b-statistics__answer">
                <div className="b-answer-indicator">
                  <div className="b-answer-indicator__text" id="js-answer-text">Idle</div>
                  <div className="b-answer-indicator__explanation" id="js-answer-explanation">
                    <span className="b-answer-indicator__explanation__aub" id="js-answer-explanation__aub">A</span>
                    =
                    <span className="b-answer-indicator__explanation__hg" id="js-answer-explanation__hg">?</span>
                  </div>
                </div>
              </div>
              <div className="b-statistics__totals">
                <div className="b-statistics__row">
                  <span className="b-statistics__row-name">Attempts </span>
                  <span className="b-statistics__row-value" id="js-total-tasks">0</span>
                </div>
                <div className="b-statistics__row">
                  <span className="b-statistics__row-name">Hits </span>
                  <span className="b-statistics__row-value" id="js-total-hits">0</span>
                </div>
                <div className="b-statistics__row">
                  <span className="b-statistics__row-name">Misses </span>
                  <span className="b-statistics__row-value" id="js-total-misses">0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="b-status">
            <div className="b-status__caption">
              <span>Progress</span>
            </div>
            <div className="b-status__container">
              <div className="p-status__to-learn">
                <div className="p-status__to-learn__caption">To Learn</div>
                <div id="js-letters-to-learn">
                </div>
              </div>
              <div className="p-status__in-learning">
                <div className="p-status__in-learning__caption">Learning</div>
                <div id="js-letters-in-learning">
                </div>
              </div>
              <div className="p-status__well-learnt">
                <div className="p-status__well-learnt__caption">Learnt</div>
                <div id="js-letters-well-learnt">
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="b-font-sample__aurebesh">
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className="b-font-sample__aurebesh_inv">
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className="b-font-sample__aurebesh_tech">
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className="b-font-sample__aurebesh_tech_inv">
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

        <div className="b-font-sample__aurebesh_inverted_capitals">
          <span>abcdefghijklmnopqrstuvwxyz1234567890thshookhngcheoae</span>
        </div>

          <span className="b-status__letter">[letter.letter]</span>
          {/*<span>{{letter.hits}}</span>*/}
          {/*<span>{{letter.misses}}</span>*/}
          {/*<span>{{letter.hitsAfterLastMiss}}</span>*/}
      </main>
    </>
  )
}
