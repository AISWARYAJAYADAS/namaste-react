import React, {useEffect,useState} from 'react';
import { restaurantService } from '../services/restaurantService';

export const useRestaurantMenu = (id) => {
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [offers, setOffers] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // Guard clause
        fetchRestaurantMenu();
    }, [id]);

    const fetchRestaurantMenu = async() =>{
        try{
            setLoading(true);
            setError(null);

            const data = await restaurantService.fetchRestaurantMenu(id);

            setRestaurantInfo(data.restaurantInfo);
            setOffers(data.offers);
            setMenuItems(data.menuItems);
            
            if (!data.restaurantInfo) {
                throw new Error('Restaurant data not found in API response');
            }

         } catch (error) {
            console.error('Error fetching restaurant menu:', error);
            setError(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }
        return {
        restaurantInfo,
        offers,
        menuItems,
        loading,
        error,
        refetch: fetchRestaurantMenu
    };
}

