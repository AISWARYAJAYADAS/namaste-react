import React from 'react';

export const Header = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <img src='https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg' alt='logo' />
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