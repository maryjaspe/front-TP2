import React from 'react';

const Button = ({ children, onClick, isDisabled }) => {
  return (
    <button
      className={`${isDisabled ? "bg-gray-500 hover:bg-gray-500" : "hover:bg-[#b23417] bg-[#3f110b]"
        } text-white font-bold py-2 px-4 rounded`}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;