import React from 'react';
import { getImageUrl } from '../utils/imageUtils';

export const MenuSection = ({ menuItems }) => {
    return (
        <div className="menu-section">
            <h2 className="menu-title">Recommended ({menuItems.length})</h2>
            
            {menuItems.length === 0 ? (
                <p className="no-items">No menu items available</p>
            ) : (
                <div className="menu-items">
                    {menuItems.map((item, index) => {
                        const menuItem = item?.card?.info;
                        if (!menuItem) return null;
                        
                        const uniqueKey = `${menuItem.id || 'no-id'}-${menuItem.name?.replace(/\s+/g, '-') || 'unnamed'}-${index}`;
                        
                        return (
                            <div key={uniqueKey} className="menu-item">
                                <div className="item-info">
                                    <h3>{menuItem.name}</h3>
                                    <p className="price">
                                        ₹{(menuItem.price || menuItem.defaultPrice) / 100}
                                    </p>
                                    {menuItem.description && (
                                        <p className="description">{menuItem.description}</p>
                                    )}
                                </div>
                                {menuItem.imageId && (
                                    <img 
                                        src={getImageUrl(menuItem.imageId)} 
                                        alt={menuItem.name}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};