import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSwiggyMenuUrl } from "../utils/constants";
import "./RestaurantMenu.css"; 
import {Shimmer} from "./Shimmer";
import { getImageUrl } from "../utils/imageUtils";

export const RestaurantMenu = () => {
    const {id} = useParams();
    console.log('Restaurant ID from URL:', id);

    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [offers, setOffers] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetchRestaurantMenu();
    },[id]);

    const fetchRestaurantMenu = async () => {
        try{
            setLoading(true);
            setError(null);

            const swiggyMenuUrl= getSwiggyMenuUrl(id);
            const data = await fetch(swiggyMenuUrl);
            const json = await data.json();
            console.log('Full API Response:', json);

            if(json.statusCode !== 0){
                throw new Error(json.statusMessage || 'API returned an error');
            }

            // === FIX: Search for each piece of data instead of using a hardcoded index ===
            const allCards = json?.data?.cards || [];

            let foundRestaurantInfo = null;
            let foundOffers = [];
            let foundMenuItems = [];
            
            for (const card of allCards) {
                // Search for Restaurant Info
                if (card?.card?.card?.info) {
                    foundRestaurantInfo = card.card.card.info;
                }
                
                // Search for Offers
                if (card?.card?.card?.gridElements?.infoWithStyle?.offers) {
                    foundOffers = card.card.card.gridElements.infoWithStyle.offers;
                }
                
                // Search for Menu Items (the "Regular" list)
                const regularCards = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
                if (regularCards) {
                    foundMenuItems = regularCards.flatMap(item => item?.card?.card?.itemCards || []);
                }
            }
            
            setRestaurantInfo(foundRestaurantInfo);
            setOffers(foundOffers);
            setMenuItems(foundMenuItems);
            
            if (!foundRestaurantInfo) {
                throw new Error('Restaurant data not found in API response');
            }
            // ==============================================================================

        }catch(error){
            console.error('Error fetching restaurant menu:', error);
            setError(error.message || 'Something went wrong');
        }finally{
            setLoading(false);
        }
    }

    // The rest of your component's rendering logic is good and does not need to be changed.
    if (loading) {
        return <Shimmer />;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error Loading Menu</h2>
                <p>{error}</p>
                <button onClick={fetchRestaurantMenu} className="retry-button">
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

    const { name, cuisines, avgRating, costForTwoMessage, locality, areaName } = restaurantInfo;

    return(
        <div className="restaurant-menu">
            {/* Restaurant Header */}
            <div className="restaurant-header">
                <h1 className="restaurant-name">{name}</h1>
                <p className="restaurant-cuisines">{cuisines?.join(', ')}</p>
                <div className="restaurant-details">
                    <span className="rating-badge">⭐ {avgRating}</span>
                    <span className="restaurant-info">{costForTwoMessage}</span>
                    <span className="restaurant-info">{locality}, {areaName}</span>
                </div>
            </div>

            {/* Offers Section */}
            <div className="offers-section">
                <h2 className="offers-title">Deals for you</h2>
                
                {offers.length === 0 ? (
                    <p className="no-offers">No offers available</p>
                ) : (
                    <div className="offers-grid">
                        {offers.map((offer, index) => {
                            const offerInfo = offer.info || offer;
                            
                            // ✅ Use proper unique key - combine offer data for uniqueness
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

            {/* Menu Items Section */}
            <div className="menu-section">
                <h2 className="menu-title">Recommended ({menuItems.length})</h2>
                
                {menuItems.length === 0 ? (
                    <p className="no-items">No menu items available</p>
                ) : (
                    <div className="menu-items">
                        {menuItems.map((item, index) => {
                            const menuItem = item?.card?.info;
                            if (!menuItem) return null;
                            
                            // ✅ Use proper unique key - menu item ID or fallback
                            const uniqueKey = menuItem.id || 
                                            `${menuItem.name}-${menuItem.price || menuItem.defaultPrice}-${index}`;
                            
                            return (
                                <div key={uniqueKey} className="menu-item">
                                    <div className="item-info">
                                        <h3>{menuItem.name}</h3>
                                        <p className="price">
                                            ₹{(menuItem.price || menuItem.defaultPrice) / 100}
                                        </p>
                                        {menuItem.description && (
                                            <p className="description">{menuItem.description}</p>
                                        )}
                                    </div>
                                    {menuItem.imageId && (
                                        <img 
                                            src={getImageUrl(menuItem.imageId)} 
                                            alt={menuItem.name}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;