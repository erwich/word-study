import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux';

import { dropWord } from '../features/sortGame';

const Word = ({ word, editable, onWordDrop }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: `word`,
    item: { word },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        dispatch( dropWord({ category: dropResult.name, word: item.word }) )
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? `opacity-40` : ``
  return (
    <span
      ref={editable ? drag : null}
      data-testid={word}
      className={`
        inline-block 
        bg-gray-200 
        rounded-full 
        px-3 
        py-1 
        text-sm 
        font-semibold 
        text-gray-700 
        mr-2 
        mb-2 
        text-xl 
        hover:bg-gray-400 
        cursor-help
        ${opacity}
      `}
    >
      {word}
    </span>
  );
};

export default Word;
