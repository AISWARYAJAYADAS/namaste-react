import { useState, useEffect } from "react";
import { SWIGGY_API_URL } from "./constants";

export const useRestaurantsData = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);
            const response = await fetch(SWIGGY_API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const json = await response.json();
                        const restaurantsData = json?.data?.cards
                ?.find(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
                ?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            if (restaurantsData && Array.isArray(restaurantsData)) {
                console.log(restaurantsData.map(restaurant => restaurant.info.id));
                setRestaurants(restaurantsData);
            } else {
                throw new Error('No restaurants data found in API response');
            }
            
              
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { restaurants, loading, error,refetch:fetchData };
    
}