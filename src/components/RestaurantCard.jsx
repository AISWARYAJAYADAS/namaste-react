import React from "react";
import { getImageUrl } from "../utils/imageUtils";
import { Link } from "react-router-dom";


export const RestaurantCard = ({restaurant})=>{
    const { name, cloudinaryImageId, cuisines, avgRating, sla } = restaurant.info;
    
    return (
        <div className="card">
            <Link to={`/restaurant/${restaurant.info.id}`}>
            <img src={getImageUrl(cloudinaryImageId)} alt={restaurant.name} />
            <h3>{name}</h3>
            <p>{cuisines.join(' • ')}</p>
            <p>⭐ {avgRating} • {sla.deliveryTime} minutes</p>
            </Link>
        </div>
    );
}