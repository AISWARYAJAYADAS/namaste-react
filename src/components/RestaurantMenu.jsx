import React from "react";
import { useParams } from "react-router-dom";
import { useRestaurantMenu } from "../utils/useRestaurantMenuHook";
import { RestaurantHeader } from "./RestaurantHeader";
import { OffersSection } from "./OffersSection";
import { MenuSection } from "./MenuSection";
import { Shimmer } from "./Shimmer";
import "./RestaurantMenu.css";

export const RestaurantMenu = () => {
    const {id} = useParams();
    console.log('Restaurant ID from URL:', id);

    // All complex logic is now in the custom hook!
    const { 
        restaurantInfo, 
        offers, 
        menuItems, 
        loading, 
        error, 
        refetch 
    } = useRestaurantMenu(id);

    if (loading) return <Shimmer />;
    
    if (error) {
        return (
            <div className="error-container">
                <h2>Error Loading Menu</h2>
                <p>{error}</p>
                <button onClick={refetch} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }
    
    if (!restaurantInfo) {
        return (
            <div className="not-found-container">
                <h2>Restaurant Not Found</h2>
                <p>The restaurant you're looking for doesn't exist</p>
            </div>
        );
    }

    return(
        <div className="restaurant-menu">
           <RestaurantHeader restaurantInfo={restaurantInfo} />
           <OffersSection offers={offers} />
           <MenuSection menuItems={menuItems} />
        </div>
    );
};

export default RestaurantMenu;