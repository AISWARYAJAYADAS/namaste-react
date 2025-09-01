import React from 'react';
import { LOGO_URL } from '../utils/constants';

export const Header = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <img src={LOGO_URL} alt='logo' />
            </div>

            <div className='nav-menu'>
                <ul className='nav-list'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    );
};