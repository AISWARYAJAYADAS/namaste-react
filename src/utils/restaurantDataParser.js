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


    //     // Extract menu categories from the specific path
     const menuCategories = allCards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    
    // // Simple filter to get just the titles
    const categoryTitles = menuCategories
        .map(item => item?.card?.card?.title)
        .filter(title => title); // Remove null/undefined titles
   
    console.log("CATEGORY TITLES",categoryTitles);


    // Extract menu categories from index 2 to end
    const allMenuCategories = allCards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    
      const menuCategories3 = allMenuCategories
        .slice(2) // Start from index 2
        .filter(item => {
            const cardType = item?.card?.card?.['@type'];
            return cardType === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory';
        })
        .map((item, index) => ({
        title: item?.card?.card?.title,
        itemCards: item?.card?.card?.itemCards || [],
        itemCount: (item?.card?.card?.itemCards || []).length,
        originalIndex: index + 2
    }))
    .filter(category => category.title && category.itemCount > 0);
        
    
    console.log("MENU CATEGORIES (ItemCategory from index 2)", menuCategories3);

    



        return {restaurantInfo,offers,menuItems,menuCategories3};
}