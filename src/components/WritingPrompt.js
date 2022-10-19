import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Alert from './Alert';
import PillButton from './PillButton';
import data, { week } from '../data';
import {
  submitWritingWord,
  setNewWritingPromptWord,
} from '../features/sortGame';

const SELECT_CATEGORY_ERROR = 'You need to pick a column to sort this word into!';

function WritingPrompt({ word }) {
  const dispatch = useDispatch();

  const validWords = data.map((column) => column.words).flat();
  const [audio, setAudio] = useState(null);
  const categories = data.map((column) => column.category);

  const [chosenCategory, setChosenCategory] = useState(categories[0]);
  const [typedWord, setTypedWord] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState('');

  const wordsLeft = useSelector(({ sortGame }) => sortGame.wordBoxWords);

  useEffect(() => {
    if (week && word) {
      import(`../assets/clips/${week}/${word}.mp3`).then((res) => {
        setAudio(new Audio(res.default));
      });
    }
  }, [word]);

  const submitWord = () => {
    if (!validWords.includes(typedWord.toLowerCase())) {
      setError('Incorrect word. Check the spelling and try again!');
      setShowError(true);
      return;
    }
    if (!chosenCategory) {
      setError(SELECT_CATEGORY_ERROR);
      setShowError(true);
      return;
    }
    dispatch(
      submitWritingWord({
        category: chosenCategory,
        word: typedWord.toLowerCase(),
      }),
    );
    dispatch(setNewWritingPromptWord());
    setShowError(false);
    setError('');
    setTypedWord('');
    setChosenCategory('');
  };

  return (
    <div className="my-4 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitWord();
        }}
        className="flex flex-wrap w-full gap-1"
      >
        <div className="w-full md:w-72 items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Write the word that you hear"
            value={typedWord}
            onChange={(e) => setTypedWord(e.target.value)}
            aria-label="Word"
          />
        </div>
        <div className={`
            flex 
            rounded-md 
            dark:bg-slate-900 
            px-2 
            py-2 
            gap-1
            ${showError && error === SELECT_CATEGORY_ERROR ? 'border-dashed border-2 border-red-500' : null}
            `}
        >
          {categories.map((category) => {
            const bgColor = category === chosenCategory ? 'bg-green-500' : 'bg-gray-500';
            return (
              <PillButton
                text={category}
                key={category}
                className={bgColor}
                onClick={() => setChosenCategory(category)}
              />
            );
          })}
        </div>
        <button
          className="bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded mx-1"
          type="button"
          onClick={() => {
            audio.play();
          }}
        >
          Listen
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Enter
        </button>
      </form>
      <p className="my-1 px-1 dark:text-slate-100">
        {wordsLeft.length}
        /
        {validWords.length}
        {' '}
        words left
      </p>

      <Alert className="mt-3" show={showError} setShow={setShowError} dismissible color="red">
        {error}
      </Alert>
    </div>
  );
}

export default WritingPrompt;
