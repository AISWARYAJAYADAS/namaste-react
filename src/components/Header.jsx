import React from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';
import { useOnlineStatus } from '../utils/useOnlineStatus';

export const Header = () => {
    const { searchText, setSearchText, showTopRated, setShowTopRated } = useContext(AppContext);
    const isOnline = useOnlineStatus();
    
    return (
        <div className='header'>
            <div className='header-content'>
                
                {/* Compact Logo */}
                <div className='logo'>
                    <img src={LOGO_URL} alt='FoodDelivery' />
                </div>

                {/* Compact Search */}
                <div className='search-container'>
                    <div className='search-icon'>🔍</div>
                    <input 
                        type='text' 
                        placeholder='Search for food, restaurants, or cuisines' 
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)}
                        className='search-input'
                    />
                </div>

                {/* Compact Navigation */}
                <ul className='nav-list'>
                    <li>Online : {isOnline ? "🟢" : "🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li>Cart</li>
                </ul>

                {/* Compact Toggle */}
                <div className='toggle-container'>
                    <span className='toggle-label'>Top Rated</span>
                    <button 
                        className={`toggle-switch ${showTopRated ? 'active' : ''}`}
                        onClick={() => setShowTopRated(!showTopRated)}
                    >
                        <div className='toggle-slider'></div>
                    </button>
                </div>
            </div>
        </div>
    );
};