import { Tooltip } from '@material-tailwind/react';
import { useDrop } from 'react-dnd';
import Word from './Word';

function WordColumn({
  header, words, description, editable, onWordDrop,
}) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'word',
    drop: () => ({ name: header }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const borderClass = canDrop && isOver ? 'border-dashed border-2 border-gray-200' : '';
  const heightCheck = words.length ? '' : 'h-48';
  return (
    <div
      className={`
        flex
        flex-col
        w-full
        md:w-40
        lg:w-52
        xl:w-56
        mb-3 
        rounded-sm 
        bg-slate-100 
        py-4 px-4 
        dark:bg-slate-900 
        dark:text-slate-100
        ${heightCheck}
        `}
    >
      <Tooltip
        content={description}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        className={`
                    bg-slate-600
                    rounded-sm
                    py-2
                `}
      >
        <h1
          className={`
                    border-l-8
                    px-4
                    py-1
                    mb-3
                    text-2xl
                    text-center
                    dark:bg-slate-800
                    rounded-sm
                    w-full
                `}
        >
          {header}
        </h1>
      </Tooltip>
      <div ref={editable ? drop : null} className={`${borderClass} px-1 py-1 grow`} data-testid="dustbin">
        {words.map((word) => (
          <Word key={word} word={word} editable={editable} onWordDrop={onWordDrop} />
        ))}
      </div>
    </div>
  );
}

export default WordColumn;
