import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
import { Plus } from 'lucide-react';

export const ItemList = ({ itemCards, restaurantInfo }) => {
    const dispatch = useDispatch();

    const handleAddItem = (itemInfo) => {
        console.log("Adding item to cart:", itemInfo);
        dispatch(addItem({ item: itemInfo, restaurantInfo }));
    };

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
                                <div className="flex flex-col items-end gap-3">
                                    {itemInfo?.imageId && (
                                        <img 
                                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${itemInfo.imageId}`}
                                            alt={itemInfo.name}
                                            className="category-item-image"
                                        />
                                    )}
                                    <button
                                        className="flex items-center gap-2 bg-orange-500 text-white 
                                        font-semibold px-4 py-2 rounded-lg 
                                        hover:bg-orange-600 transition-all duration-200 
                                        shadow-sm hover:shadow-md transform hover:-translate-y-0.5 min-w-[100px] justify-center"
                                        onClick={() => handleAddItem(itemInfo)}
                                    >
                                        <Plus className="w-4 h-4" />
                                        ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};