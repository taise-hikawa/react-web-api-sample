import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="sr-only">読み込み中...</span>
        </div>
    );
};

export default LoadingSpinner;