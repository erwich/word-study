import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Alert } from '@material-tailwind/react';
import data, { week } from '../data';
import {
  submitWritingWord,
  setNewWritingPromptWord,
} from '../features/sortGame';

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
  };

  return (
    <div className="my-4 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitWord();
        }}
        className="w-full max-w-xl"
      >
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Write the word that you hear"
            value={typedWord}
            onChange={(e) => setTypedWord(e.target.value)}
            aria-label="Full name"
          />
          <select
            className={`
              block bg-white w-1/2 border dark:bg-slate-800 dark:text-slate-100 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline
            `}
            defaultValue={chosenCategory}
            onChange={(e) => setChosenCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            className="flex-shrink-0 bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded mx-1"
            type="button"
            onClick={() => {
              audio.play();
            }}
          >
            Listen
          </button>
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Enter
          </button>
        </div>
      </form>
      <p className="my-1 px-1 dark:text-slate-100">
        {wordsLeft.length}
        /
        {validWords.length}
        {' '}
        words left
      </p>

      <Alert className="mt-3" show={showError} color="red">
        {error}
      </Alert>
    </div>
  );
}

export default WritingPrompt;
