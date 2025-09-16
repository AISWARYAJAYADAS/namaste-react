import React from 'react';

export const ItemList = ({ itemCards }) => {
    if (!itemCards || itemCards.length === 0) {
        return (
            <div className="category-body">
                <div className="category-items">
                    <p className="text-center text-gray-500 py-8">No items available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="category-body">
            <div className="category-items">
                {itemCards.map((item, itemIndex) => {
                    const itemInfo = item?.card?.info;
                    
                    return (
                        <div key={`${itemInfo?.id || itemIndex}-${itemIndex}`} className="category-item">
                            <div className="category-item-content">
                                <div className="category-item-info">
                                    <h3 className="category-item-title">
                                        {itemInfo?.name}
                                    </h3>
                                    <p className="category-item-price">
                                        ₹{itemInfo?.price 
                                            ? (itemInfo.price / 100) 
                                            : itemInfo?.defaultPrice 
                                                ? (itemInfo.defaultPrice / 100) 
                                                : 'N/A'}
                                    </p>
                                    {itemInfo?.description && (
                                        <p className="category-item-description">
                                            {itemInfo.description}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    {itemInfo?.imageId && (
                                        <img 
                                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${itemInfo.imageId}`}
                                            alt={itemInfo.name}
                                            className="category-item-image"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};