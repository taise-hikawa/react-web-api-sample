import React, { useState } from 'react';
import ImageDisplay from './components/ImageDisplay';

const mockData = {
    image: {
        date: "2023-01-15",
        title: "Hubble Captures Stellar Fireworks",
        url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800",
        hdurl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200",
        media_type: "image",
        explanation: "これはハッブル宇宙望遠鏡によって撮影された星雲の画像です。星の誕生と死の過程で放出されるガスと塵が織りなす宇宙の芸術作品と言えるでしょう。この画像は宇宙の壮大さと美しさを伝えています。",
        copyright: "NASA, ESA, CSA"
    },
    video: {
        date: "2023-02-10",
        title: "Journey Through The Solar System",
        url: "https://www.youtube.com/embed/libKVRa01L8",
        media_type: "video",
        explanation: "この動画では、私たちの太陽系を旅するような映像が紹介されています。各惑星の特徴や規模を視覚的に理解することができます。NASAの最新の観測データに基づいて作成されたシミュレーションです。"
    }
};

const ImageDisplayDemo = () => {
    const [displayType, setDisplayType] = useState('image');
    const currentData = mockData[displayType];

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">ImageDisplay コンポーネントデモ</h1>

            <div className="mb-4">
                <label className="mr-2 font-medium">表示タイプ:</label>
                <select
                    value={displayType}
                    onChange={(e) => setDisplayType(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="image">画像</option>
                    <option value="video">動画</option>
                </select>
            </div>

            <div className="border rounded shadow-lg">
                <ImageDisplay
                    data={currentData}
                    date={currentData.date}
                />
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded">
                <h2 className="text-lg font-semibold mb-2">現在のデータ:</h2>
                <pre className="bg-white p-3 rounded text-sm overflow-auto">
                    {JSON.stringify(currentData, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default ImageDisplayDemo;