import { useState, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

const TextDropdown = ({product, textProperty}) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const text = product[textProperty];

  const firstFourWords = text.split(' ').slice(0, 2).join(' ');
  const remainingText = text.split(' ').slice(2).join(' ');

  return (
    <div className="relative">
      <div className="text-sm text-gray-700 dark:text-gray-400">
        <span>{firstFourWords}</span>
        {remainingText && !isOpen && (
          <span className="text-gray-500">... </span>
        )}
        {isOpen && (
          <span>{' ' + remainingText}</span>
        )}
      </div>
      <button
        onClick={toggleDropdown}
        className="mt-2 text-blue-600 dark:text-blue-500 hover:underline text-sm"
      >
        {isOpen ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
};

export default TextDropdown;