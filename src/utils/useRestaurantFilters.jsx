import {useContext} from "react";
import { AppContext } from "../App";

export const useRestaurantFilters = (restaurants) => {
    const { searchText, showTopRated } = useContext(AppContext);
    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesSearch = searchText.trim() === "" || 
        restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.info.cuisines.some(cuisine => 
            cuisine.toLowerCase().includes(searchText.toLowerCase())
        );

        const matchesRating = !showTopRated || restaurant.info.avgRating > 4.5;

        return matchesSearch && matchesRating;
    })

    return filteredRestaurants;
}