import React from 'react';

const Square = ({ value, onClick, index }) => {
  return (
    <button
      className="square"
      onClick={() => onClick(index)}
      style={{ color: value === 'X' ? 'blue' : 'red' }}
    >
      {value}
    </button>
  );
};

export default Square;
