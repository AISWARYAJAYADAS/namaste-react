import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { Shimmer } from './Shimmer';
import { useRestaurantsData } from '../utils/useRestaurantsData';
import { useRestaurantFilters } from '../utils/useRestaurantFilters';
import { useOnlineStatus } from '../utils/useOnlineStatus';


export const Body = () => {
    const { restaurants, loading, error, refetch } = useRestaurantsData();
    const filteredRestaurants = useRestaurantFilters(restaurants);
    const isOnline = useOnlineStatus();

    if (!isOnline) {
        return(
            <div className='flex-1 bg-gray-50 min-h-screen'>
                <div className="offline-state">
                    <h2>You're offline</h2>
                    <p>Please check your internet connection to view  restaurants</p>
                    <button onClick={refetch} className='retry-button'>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }



    if (loading) {
        return <Shimmer />;
    }

    if (error) {
        return (
             <div className='flex-1 bg-gray-50 min-h-screen'>
                <div className='error-state'>
                    <h2>Oops! Something went wrong</h2>
                    <p>We couldn't load the restaurants. Please try again.</p>
                    <button onClick={refetch} className='retry-button'>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='flex-1 bg-gray-50 min-h-screen'>
            <h2 className='section-title'>Popular Restaurants</h2>

            {filteredRestaurants.length === 0 ? (
                <div className='no-results'>
                    <h3>No restaurants found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <div className='cards-section'>
                    {filteredRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    );
}