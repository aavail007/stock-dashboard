import React from 'react';
const Loading: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-third"
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
