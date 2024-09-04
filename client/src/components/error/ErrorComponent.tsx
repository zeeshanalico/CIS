import React from 'react';

interface ErrorComponentProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  buttonText: string;
  onButtonClick: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  icon,
  title,
  message , 
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-transparent px-6 py-24 mb-4 m-4 md:m-0 h-full">
      <div className="flex justify-center">
        {icon}
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold mt-4 mb-2">{title}</h1>
        <p className="text-gray-500 text-xl mb-10">
          {message}
        </p>
        <button
          className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
