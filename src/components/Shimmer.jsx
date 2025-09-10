import React from 'react';

export const Shimmer = () => {
    return(
        <div className='body'>
            <div className='shimmer-title'></div>
            <div className="shimmer-container">
                {Array.from({length: 8}, (_, index) => (
                    <div key={`shimmer-card-${index}`} className="shimmer-card">
                        <div className="shimmer-image"></div>
                        <div className="shimmer-text"></div>
                        <div className="shimmer-text short"></div>
                        <div className="shimmer-text short"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}