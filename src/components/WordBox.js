import { memo } from 'react'
import Word from './Word.js'

export const WordBox = memo(function WordBox({words, onWordDrop}) {
  return (
      <div 
        style={{ overflow: 'hidden', clear: 'both' }}
        className={`
          flex
          flex-wrap
          mt-2
          py-2
          px-2
          w-full
          lg:w-1/2
          rounded-sm
          bg-slate-100 
          dark:bg-slate-900
        `}
      >
        <span
          className={`
            w-full
            mb-4
            px-4
            dark:text-slate-100
            font-semibold
          `}
        >
          Drag each word to the correct sort column
        </span>
        {words.map((word, ndx) => (
          <Word key={word} word={word} editable={true} onWordDrop={ onWordDrop } />
        ))}
    </div>
  )
})
