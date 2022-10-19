export const getColor = (color) => {
  switch (color) {
    case 'blue':
      return {
        bgColor: 'bg-sky-500',
        activeColor: 'active:bg-sky-700',
        hoverColor: 'hover:bg-sky-700',
      };
    default:
      return {
        bgColor: 'bg-gray-500',
        activeColor: 'active:bg-gray-600',
        hoverColor: 'hover:bg-gray-600',
      };
  }
};

export default {
  getColor,
};
