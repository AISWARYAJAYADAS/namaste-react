import React, {useEffect,useState} from 'react';
import { restaurantService } from '../services/restaurantService';

export const useRestaurantMenu = (id) => {
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [offers, setOffers] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuCategories3, setMenuCategories3] = useState([]);

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
            setMenuCategories3(data.menuCategories3);


            console.log("data",data);
            console.log("hook categoryTitles",data.categoryTitles);
            // console.log("restaurantInfo",data.restaurantInfo);
            // console.log("menuItems",data.menuItems);
            
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
        menuCategories3,
        loading,
        error,
        refetch: fetchRestaurantMenu
    };
}

