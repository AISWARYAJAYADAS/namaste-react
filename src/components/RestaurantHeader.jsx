import React from 'react';

export const RestaurantHeader = ({ restaurantInfo }) => {
    const { name, cuisines, avgRating, costForTwoMessage, locality, areaName } = restaurantInfo;
    
    return (
        <div className="restaurant-header">
            <h1 className="restaurant-name">{name}</h1>
            <p className="restaurant-cuisines">{cuisines?.join(', ')}</p>
            <div className="restaurant-details">
                <span className="rating-badge">⭐ {avgRating}</span>
                <span className="restaurant-info">{costForTwoMessage}</span>
                <span className="restaurant-info">{locality}, {areaName}</span>
            </div>
        </div>
    );
};