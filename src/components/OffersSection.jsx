import React from 'react';

export const OffersSection = ({ offers }) => {
    return (
        <div className="offers-section">
            <h2 className="offers-title">Deals for you</h2>
            
            {offers.length === 0 ? (
                <p className="no-offers">No offers available</p>
            ) : (
                <div className="offers-grid">
                    {offers.map((offer, index) => {
                        const offerInfo = offer.info || offer;
                        const uniqueKey = offerInfo?.header ? 
                            `${offerInfo.header}-${offerInfo.offerTag || index}` : 
                            `offer-${index}`;
                        
                        return (
                            <div key={uniqueKey} className="offer-card">
                                <div className="offer-content">
                                    <h3 className="offer-header">{offerInfo.header}</h3>
                                    <p className="offer-description">{offerInfo.description}</p>
                                    {offerInfo.offerTag && (
                                        <span className="offer-tag">{offerInfo.offerTag}</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};