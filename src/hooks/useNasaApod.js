// hooks/useNasaApod.js
import { useState, useEffect } from 'react';

// 環境変数から API キーを取得するか、デモキーを使用
const API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';

export const useNasaApod = (date) => {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchAPOD = async () => {
            setLoading(true);

            try {
                const url = new URL('https://api.nasa.gov/planetary/apod');
                url.searchParams.append('api_key', API_KEY);
                url.searchParams.append('date', date);

                const response = await fetch(url, { signal });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(
                        errorData.msg || `NASA API リクエストエラー: ${response.status}`
                    );
                }

                const data = await response.json();
                setApodData(data);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('NASA API エラー:', err);
                    setError(err.message);
                    setApodData(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAPOD();

        return () => controller.abort();
    }, [date]);

    return { apodData, loading, error };
};