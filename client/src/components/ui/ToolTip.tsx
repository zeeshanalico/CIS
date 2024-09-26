import React, { useState } from 'react';

const TooltipWithOptions = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="relative inline-block">
      {/* Button to toggle the tooltip */}
      <button
        onClick={handleClick}
        className="p-2 bg-indigo-900 text-white rounded-md"
      >
        Open Tooltip
      </button>

      {/* Tooltip - use conditional rendering */}
      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-10">
          <ul className="py-2">
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => alert('Option 1 clicked')}
            >
              Products
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => alert('Option 2 clicked')}
            >
              Option 2
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TooltipWithOptions;
