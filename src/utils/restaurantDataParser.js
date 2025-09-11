export const parseRestaurantData = (json) => {
        const allCards = json?.data?.cards || [];

        // find() -  stops at first match (faster than for loop)
        const restaurantInfo = allCards
            .find(card => card?.card?.card?.info)
            ?.card?.card?.info || null;

        const offers = allCards
            .find(card => card?.card?.card?.gridElements?.infoWithStyle?.offers)
            ?.card?.card?.gridElements?.infoWithStyle?.offers || [];

            const menuItems = allCards
            .flatMap(card => card?.groupedCard?.cardGroupMap?.REGULAR?.cards || [])
            .flatMap(item => item?.card?.card?.itemCards || []);


        return {restaurantInfo,offers,menuItems};
}