
import React from 'react';
import Loader from './Loader';

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
    >
      {isLoading ? <Loader /> : 'Review Code'}
    </button>
  );
};

export default ActionButton;
