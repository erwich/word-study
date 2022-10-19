import './App.css';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Alert from './components/Alert';
import {
  setGameMode,
  setWordBoxWords,
  resetWordColumns,
  resetGameMode,
  completeGame,
  fixAnswers,
  setNewWritingPromptWord,
} from './features/sortGame';

import Header from './components/Header';
import WordColumn from './components/WordColumn';
import WordBox from './components/WordBox';
import GameCompleteModal from './components/GameCompleteModal';

import WritingPrompt from './components/WritingPrompt';

import wordColumns from './data';

function App() {
  const gameMode = useSelector(({ sortGame }) => sortGame.gameMode);
  const gameColumns = useSelector(({ sortGame }) => sortGame.wordColumns);
  const columns = gameMode ? gameColumns : wordColumns;
  const wordBoxWords = useSelector(({ sortGame }) => sortGame.wordBoxWords);
  const complete = useSelector(({ sortGame }) => sortGame.complete);
  const outcome = useSelector(({ sortGame }) => sortGame.outcome);

  const writingPromptWord = useSelector(({ sortGame }) => sortGame.writingPromptWord);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [startSeconds, setStartSeconds] = useState(0);
  const [endSeconds, setEndSeconds] = useState(0);

  const dispatch = useDispatch();

  const startBlindSortGame = () => {
    dispatch(
      setWordBoxWords(
        wordColumns
          .map(({ words }) => words)
          .flat()
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value),
      ),
    );
    dispatch(resetWordColumns());
    dispatch(setGameMode('blind'));
    setStartSeconds(Math.round(Date.now() / 1000));
  };

  const startWritingSortGame = () => {
    dispatch(
      setWordBoxWords(
        wordColumns
          .map(({ words }) => words)
          .flat()
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value),
      ),
    );
    dispatch(resetWordColumns());
    dispatch(setGameMode('writing'));
    setStartSeconds(Math.round(Date.now() / 1000));
  };
  dispatch(setNewWritingPromptWord());

  const handleFinishGame = () => {
    if (wordBoxWords.length > 0 && gameMode === 'blind') {
      setError('You still have words left to sort!');
      setShowError(true);
      return;
    }
    dispatch(completeGame());
    setEndSeconds(Math.round(Date.now() / 1000));
    setError('');
    setShowError(false);
  };

  const [isDark, setDark] = useState(true);
  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="dark:bg-slate-800 min-h-screen">
        {complete && (
          <GameCompleteModal
            title={
              outcome.score < outcome.maxScore
                ? 'Keep Trying! 💪'
                : 'Good job! 🎊'
            }
          >
            {/* body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 dark:text-slate-100 text-xl leading-relaxed">
                You scored
                {' '}
                <strong>{outcome.score}</strong>
                {' '}
                out of
                {' '}
                <strong>{outcome.maxScore}</strong>
                {' '}
                points
              </p>
              <p className="my-4 text-slate-500 dark:text-slate-100 text-xl leading-relaxed">
                It took you
                {' '}
                <strong>{endSeconds - startSeconds}</strong>
                {' '}
                seconds
                to finish this game.
              </p>
            </div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {outcome.score < outcome.maxScore && (
                <button
                  className="bg-sky-500 text-white active:bg-sky-600 hover:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    dispatch(fixAnswers());
                  }}
                >
                  Fix Answers
                </button>
              )}
              <button
                className="bg-teal-500 text-white active:bg-teal-600 hover:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  dispatch(resetGameMode());
                }}
              >
                Finish
              </button>
            </div>
          </GameCompleteModal>
        )}
        <div className="container mx-auto pt-2">
          <div className="flex flex-col lg:flex-row flex-wrap py-4">
            <div className="px-4 py-4 w-full xl:basis-3/4">
              <Header text="Word Study &#8212; Week of October 17th, 2022" />
              <div className="flex flex-wrap md:gap-4 md:flex-nowrap">
                {columns.map(({ category, words, description }) => (
                  <WordColumn
                    key={category}
                    editable={gameMode}
                    header={category}
                    words={words}
                    description={description}
                  />
                ))}
              </div>
              {gameMode === 'blind' && wordBoxWords ? (
                <WordBox words={wordBoxWords} />
              ) : null}
              {gameMode === 'writing'
                ? <WritingPrompt word={writingPromptWord} />
                : null }
              <div className="my-2">
                <Alert show={showError} setShow={setShowError} dismissible color="red">
                  {error}
                </Alert>
              </div>
              <div className="flex flex-wrap my-2 gap-2">
                {gameMode ? (
                  <>
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        handleFinishGame();
                      }}
                    >
                      Check Answers
                    </button>
                    <button
                      className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        setShowError(false);
                        setError('');
                        dispatch(resetGameMode());
                      }}
                    >
                      Go Back
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        startBlindSortGame();
                      }}
                    >
                      Practice Blind Sort
                    </button>
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        startWritingSortGame();
                      }}
                    >
                      Practice Writing Sort
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="py-4 px-8 bg-white md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 absolute bottom-0">
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-sm text-white py-1 px-2 rounded"
            type="button"
            onClick={() => {
              setDark(!isDark);
            }}
          >
            {isDark ? 'Light Mode ' : 'Dark Mode '}
            {isDark ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
