import { getSwiggyMenuUrl } from '../utils/constants';
import { parseRestaurantData } from '../utils/restaurantDataParser';

export const restaurantService = {
    async fetchRestaurantMenu(id) {
        try{
        const response = await fetch(getSwiggyMenuUrl(id));
        const json = await response.json();
        
        if (json.statusCode !== 0) {
            throw new Error(json.statusMessage || 'API returned an error');
        }
        
        return parseRestaurantData(json);

        } catch (error) {
            console.error('Service error:', error);
            throw error; // Re-throw to be handled by the hook
        }

    }
};