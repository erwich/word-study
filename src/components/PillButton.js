function PillButton({ text, className, onClick }) {
  return (
    <span
      className={`
          inline-block 
          rounded-full 
          px-3 
          py-1 
          text-sm 
          font-semibold 
          text-slate-100
          text-xl
          cursor-default
          ${className}
        `}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
    >
      {text}
    </span>
  );
}

export default PillButton;
