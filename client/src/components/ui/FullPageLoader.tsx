import React from 'react';

const FullPageLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-indigo-700"></div>
    </div>
  );
};

export default FullPageLoader;
