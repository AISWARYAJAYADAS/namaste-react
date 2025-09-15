import React from "react";

export const withPromotionalLabel = (RestaurantCard) => {
    return (props) => {
        const {restaurant} = props;

        // Extract discount information from restaurant data
        const discountInfo = restaurant?.info?.aggregatedDiscountInfoV3;
        console.log("discountInfo",discountInfo);

        const discountText = discountInfo ? 
        [discountInfo.discountTag, discountInfo.header, discountInfo.subHeader]
            .filter(Boolean) // Remove empty/null values
            .join(' ') // Join with spaces
        : '';

        return(
            <div className="relative">

                
                {/* Discount Banner - Bottom of Image (Black overlay like Swiggy) */}
                {discountText && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 px-3 py-2 z-10 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold uppercase tracking-wide">
                        {discountText}
                    </span>
                    </div>
                )}
                
                {/* Render the original RestaurantCard */}
                <RestaurantCard {...props} />
            </div>
        )
    }
}