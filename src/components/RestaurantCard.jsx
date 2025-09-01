import React from "react";

export const RestaurantCard = ({restaurant})=>{
    return (
        <div className="card">
            <img src={restaurant.image} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.cuisine}</p>
            <p>⭐ {restaurant.rating} • {restaurant.deliveryTime}</p>
        </div>
    );
}