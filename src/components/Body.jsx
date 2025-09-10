import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { useState, useEffect, useContext } from 'react';
import { Shimmer } from './Shimmer';
import { AppContext } from '../App';
import { SWIGGY_API_URL } from '../utils/constants';

export const Body = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { searchText, showTopRated } = useContext(AppContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(SWIGGY_API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const json = await response.json();

            // === FIX: Use a loop to find the correct data path ===
            let restaurantsData = null;
            for (const card of json?.data?.cards || []) {
                const potentialData = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                if (potentialData && Array.isArray(potentialData)) {
                    restaurantsData = potentialData;
                    break; // Exit the loop once the data is found
                }
            }
            // ====================================================

            if (restaurantsData && Array.isArray(restaurantsData)) {
                // Log the restaurant IDs for debugging, as you did before.
                // You can remove this line in production.
                console.log(restaurantsData.map(restaurant => restaurant.info.id));
                setRestaurants(restaurantsData);
            } else {
                // This error is now thrown only if no restaurants data is found in the entire response.
                throw new Error('No restaurants data found in API response');
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Shimmer />;
    }

    if (error) {
        return (
            <div className='body'>
                <div className='error-state'>
                    <h2>Oops! Something went wrong</h2>
                    <p>We couldn't load the restaurants. Please try again.</p>
                    <button onClick={fetchData} className='retry-button'>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Professional filtering with better performance
    const displayRestaurants = restaurants.filter(restaurant => {
        const matchesSearch = searchText.trim() === "" || 
            restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
            restaurant.info.cuisines.some(cuisine => 
                cuisine.toLowerCase().includes(searchText.toLowerCase())
            );
        
        const matchesRating = !showTopRated || restaurant.info.avgRating > 4.5;
        
        return matchesSearch && matchesRating;
    });

    return (
        <div className='body'>
            <h2 className='section-title'>Popular Restaurants</h2>

            {displayRestaurants.length === 0 ? (
                <div className='no-results'>
                    <h3>No restaurants found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <div className='cards-section'>
                    {displayRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    );
}