import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { restaurantData } from '../data/restaurantData';

export const Body = () => {
    return (
        <div className='body'>
            <div className='search-section'>
                <input type='text' placeholder='Search for food, restaurants, or cuisines' />
                <button>Search</button>
            </div>
                <h2 className='section-title'>Popular Restaurants</h2>
                <div className='cards-section'>
                    {restaurantData.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
        </div>
    );
}