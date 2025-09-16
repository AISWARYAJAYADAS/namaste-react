import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';
import { ItemList } from "./ItemList";

export const RestaurantCategory = ({ categoryData,expandedCategory,setExpandedCategory }) => {
    
    const toggleCategory = (index) => {
        setExpandedCategory(expandedCategory === index ? null : index);
    };

    if (!categoryData || categoryData.length === 0) {
        return null;
    }

    return (
        <div className="category-section">
            {categoryData.map((category, index) => (
                <div key={`${category.title}-${index}`}>
                    {/* Category Header */}
                    <div 
                        className="category-header"
                        onClick={() => toggleCategory(index)}
                    >
                        <span className="category-title">
                            {category.title} ({category.itemCount})
                        </span>
                        
                        <ChevronDown 
                            className={`category-arrow ${
                                expandedCategory === index ? 'rotated' : ''
                            }`} 
                        />
                    </div>
                    
                    
                    {/* Category Body*/}
                    {expandedCategory === index && (
                        <ItemList itemCards={category.itemCards} />
                    )}


                </div>
            ))}
        </div>
    );
};