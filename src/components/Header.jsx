import React from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';

export const Header = () => {
    const { searchText, setSearchText, showTopRated, setShowTopRated } = useContext(AppContext);
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='logo'>
                    <img src={LOGO_URL} alt='logo' />
                </div>

                <div className='search-container'>
                    <input 
                        type='text' 
                        placeholder='Search for food, restaurants, or cuisines' 
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)}
                        className='search-input'
                    />
                </div>

                <div className='nav-menu'>
                    <ul className='nav-list'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li>Cart</li>
                    </ul>
                </div>

                <button className='filter-button' onClick={() => setShowTopRated(!showTopRated)}>
                    {showTopRated ? "Show All" : "Top Rated"}
                </button>
            </div>
        </div>
    );
};