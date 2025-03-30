import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // NASA APIキー（制限あり）- 実際のアプリでは環境変数にすべき
  const apiKey = 'DEMO_KEY';

  useEffect(() => {
    const fetchAPOD = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
        );

        if (!response.ok) {
          throw new Error('NASA APIからデータを取得できませんでした');
        }

        const data = await response.json();
        setApodData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setApodData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // 今日の日付を取得して日付入力の最大値に設定
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">NASA 天文画像 (APOD)</h1>

      <div className="mb-6 w-full max-w-md">
        <label htmlFor="date-picker" className="block text-gray-700 mb-2">
          日付を選択:
        </label>
        <input
          id="date-picker"
          type="date"
          value={date}
          max={today}
          min="1995-06-16" // APOD APIで利用可能な最初の日付
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-xl text-gray-600">読み込み中...</div>
          </div>
        ) : error ? (
          <div className="p-6 text-red-600">
            エラー: {error}
          </div>
        ) : apodData ? (
          <div>
            <div className="relative pb-2/3">
              {apodData.media_type === 'image' ? (
                <div className="w-full h-full flex justify-center bg-black">
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="max-h-96 object-contain"
                  />
                </div>
              ) : apodData.media_type === 'video' ? (
                <div className="flex justify-center p-4 bg-black">
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className="w-full h-96"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="p-6">メディアタイプがサポートされていません</div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{apodData.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{date} | 撮影: {apodData.copyright || 'NASA'}</p>
              <p className="text-gray-700">{apodData.explanation}</p>
            </div>
          </div>
        ) : (
          <div className="p-6">データが見つかりません</div>
        )}
      </div>
    </div>
  );
};

export default App;
