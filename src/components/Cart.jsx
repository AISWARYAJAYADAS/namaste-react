import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeItem, removeItemCompletely, addItem, clearRestaurantItems } from '../utils/cartSlice';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, MapPin, Clock, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart = () => {
    // Get cart data from Redux store
    const cartItems = useSelector(store => store.cart.items);
    const dispatch = useDispatch();

    // Group items by restaurant for better organization
    const groupedItems = cartItems.reduce((acc, item) => {
        const restaurantId = item.restaurantId;
        if (!acc[restaurantId]) {
            acc[restaurantId] = {
                restaurantInfo: item.restaurantInfo,
                items: []
            };
        }
        acc[restaurantId].items.push(item);
        return acc;
    }, {});

    // Event handlers for cart operations
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleRemoveItem = (itemId, restaurantId) => {
        dispatch(removeItem({ itemId, restaurantId }));
    };

    const handleRemoveItemCompletely = (itemId, restaurantId) => {
        dispatch(removeItemCompletely({ itemId, restaurantId }));
    };

    const handleAddItem = (item) => {
        dispatch(addItem({ item, restaurantInfo: item.restaurantInfo }));
    };

    const handleClearRestaurantItems = (restaurantId) => {
        dispatch(clearRestaurantItems(restaurantId));
    };

    // Calculate totals
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.price || item.defaultPrice || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    const calculateItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Empty cart state
    if (cartItems.length === 0) {
        return (
            <div className="cart-empty-container">
                <div className="cart-empty-content">
                    <div className="cart-empty-icon">
                        <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="cart-empty-title">Your cart is empty</h2>
                    <p className="cart-empty-description">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link to="/" className="cart-empty-button">
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            {/* Cart Header */}
            <div className="cart-header">
                <div className="cart-header-content">
                    <div className="cart-header-left">
                        <Link to="/" className="cart-back-button">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div className="cart-title-section">
                            <h1 className="cart-title">Cart</h1>
                            <p className="cart-subtitle">
                                {calculateItemCount()} items from {Object.keys(groupedItems).length} restaurant{Object.keys(groupedItems).length > 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleClearCart} className="cart-clear-button">
                        <Trash2 className="w-4 h-4" />
                        Clear Cart
                    </button>
                </div>
            </div>

            {/* Main Cart Content */}
            <div className="cart-main-content">
                <div className="cart-grid">
                    {/* Cart Items Section */}
                    <div className="cart-items-section">
                        {Object.entries(groupedItems).map(([restaurantId, group]) => (
                            <div key={restaurantId} className="restaurant-group">
                                {/* Restaurant Header */}
                                <div className="restaurant-header">
                                    <div className="restaurant-header-content">
                                        <div className="restaurant-info">
                                            <div className="restaurant-logo">
                                                <span className="restaurant-logo-text">
                                                    {group.restaurantInfo.name?.charAt(0) || 'R'}
                                                </span>
                                            </div>
                                            <div className="restaurant-details">
                                                <h3 className="restaurant-name">
                                                    {group.restaurantInfo.name}
                                                </h3>
                                                <div className="restaurant-meta">
                                                    <div className="restaurant-meta-item">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span>{group.restaurantInfo.avgRating}</span>
                                                    </div>
                                                    <div className="restaurant-meta-item">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{group.restaurantInfo.sla?.deliveryTime || 25} mins</span>
                                                    </div>
                                                    <div className="restaurant-meta-item">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{group.restaurantInfo.locality}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleClearRestaurantItems(restaurantId)}
                                            className="restaurant-remove-button"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Restaurant Items */}
                                <div className="restaurant-items">
                                    {group.items.map((item) => (
                                        <div key={`${item.id}-${item.restaurantId}`} className="cart-item">
                                            {/* Item Image */}
                                            <div className="cart-item-image-container">
                                                {item.imageId ? (
                                                    <img 
                                                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.imageId}`}
                                                        alt={item.name}
                                                        className="cart-item-image"
                                                    />
                                                ) : (
                                                    <div className="cart-item-placeholder">
                                                        <span className="cart-item-placeholder-text">No Image</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Item Details */}
                                            <div className="cart-item-details">
                                                <h4 className="cart-item-name">{item.name}</h4>
                                                {item.description && (
                                                    <p className="cart-item-description">{item.description}</p>
                                                )}
                                                <p className="cart-item-price">
                                                    ₹{((item.price || item.defaultPrice || 0) / 100).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="cart-item-controls">
                                                <div className="quantity-controls">
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id, item.restaurantId)}
                                                        className="quantity-button quantity-button-decrease"
                                                    >
                                                        <Minus className="w-3 h-3 text-gray-600" />
                                                    </button>
                                                    <span className="quantity-display">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleAddItem(item)}
                                                        className="quantity-button quantity-button-increase"
                                                    >
                                                        <Plus className="w-3 h-3 text-white" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItemCompletely(item.id, item.restaurantId)}
                                                    className="remove-item-button"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Section */}
                    <div className="order-summary-section">
                        <div className="order-summary">
                            <h2 className="order-summary-title">Order Summary</h2>
                            
                            <div className="order-summary-details">
                                <div className="order-summary-row">
                                    <span className="order-summary-label">Subtotal ({calculateItemCount()} items)</span>
                                    <span className="order-summary-value">₹{(calculateTotal() / 100).toFixed(2)}</span>
                                </div>
                                <div className="order-summary-row">
                                    <span className="order-summary-label">Delivery Fee</span>
                                    <span className="order-summary-value order-summary-value-free">Free</span>
                                </div>
                                <div className="order-summary-row">
                                    <span className="order-summary-label">Taxes & Charges</span>
                                    <span className="order-summary-value">₹{((calculateTotal() * 0.05) / 100).toFixed(2)}</span>
                                </div>
                                <hr className="order-summary-divider" />
                                <div className="order-summary-row order-summary-total">
                                    <span className="order-summary-label">Total</span>
                                    <span className="order-summary-value">₹{((calculateTotal() * 1.05) / 100).toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="checkout-button">
                                Proceed to Checkout
                            </button>
                            
                            <p className="checkout-disclaimer">
                                You won't be charged until checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};