import './App.css';
import React, { useState } from 'react';
import { useNasaApod } from './hooks/useNasaApod';
import DateSelector from './components/DateSelector';
import ImageDisplay from './components/ImageDisplay';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner.js';

const App = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { apodData, loading, error } = useNasaApod(date);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">NASA 天文画像 (APOD)</h1>

      <DateSelector
        date={date}
        onChange={setDate}
      />

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : apodData ? (
          <ImageDisplay data={apodData} date={date} />
        ) : (
          <div className="p-6">データが見つかりません</div>
        )}
      </div>
    </div>
  );
};

export default App;
