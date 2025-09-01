import React from "react";
import { getImageUrl } from "../utils/imageUtils";


export const RestaurantCard = ({restaurant})=>{
    const { name, cloudinaryImageId, cuisines, avgRating, sla } = restaurant.info;
    
    return (
        <div className="card">
            <img src={getImageUrl(cloudinaryImageId)} alt={restaurant.name} />
            <h3>{name}</h3>
            <p>{cuisines.join(' • ')}</p>
            <p>⭐ {avgRating} • {sla.deliveryTime} minutes</p>
        </div>
    );
}