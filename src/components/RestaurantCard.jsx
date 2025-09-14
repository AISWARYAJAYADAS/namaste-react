import React from "react";
import { getImageUrl } from "../utils/imageUtils";
import { Link } from "react-router-dom";


export const RestaurantCard = ({restaurant})=>{
    const { name, cloudinaryImageId, cuisines, avgRating, sla } = restaurant.info;
    
    return (
        <Link to={`/restaurant/${restaurant.info.id}`} className='card'>
            <img src={getImageUrl(cloudinaryImageId)} alt={name} />
            <h3>{name}</h3>
            <p>{cuisines?.join(' • ')}</p>
            <p className='rating'>
                <span className='star'>⭐</span>
                <span>{avgRating}</span>
                <span>•</span>
                <span>{sla.deliveryTime} minutes</span>
            </p>
        </Link>
    );
}