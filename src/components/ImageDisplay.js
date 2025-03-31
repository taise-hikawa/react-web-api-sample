import React, { useState } from 'react';

const ImageDisplay = ({ data, date }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const handleImageError = () => {
        setHasError(true);
    };

    // メディアタイプに基づいて適切なコンテンツを表示
    const renderMedia = () => {
        if (data.media_type === 'image') {
            return (
                <div className="w-full h-full flex justify-center bg-black relative">
                    {!isImageLoaded && !hasError && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    )}

                    {hasError ? (
                        <div className="text-white p-4 text-center">
                            画像の読み込みに失敗しました
                        </div>
                    ) : (
                        <img src={data.url} alt={data.title} className={`max-h-96 object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={handleImageLoad} onError={handleImageError} />
                    )}
                </div>
            );
        } else if (data.media_type === 'video') {
            return (
                <div className="flex justify-center p-4 bg-black">
                    <iframe src={data.url} title={data.title} className="w-full h-96" frameBorder="0" allowFullScreen></iframe>
                </div>
            );
        } else {
            return (
                <div className="p-6 text-center">
                    サポートされていないメディアタイプです: {data.media_type}
                </div>
            );
        }
    };

    return (
        <div>
            <div className="relative">
                {renderMedia()}
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
                <p className="text-sm text-gray-500 mb-4">
                    {new Date(date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    {data.copyright && ` | 撮影: ${data.copyright}`}
                </p>
                <p className="text-gray-700 leading-relaxed">{data.explanation}</p>
                {data.hdurl && (
                    <a href={data.hdurl} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-4 text-indigo-600 hover:text-indigo-800">
                        高解像度画像を表示
                    </a>
                )}
            </div>
        </div>
    );
};

export default ImageDisplay;