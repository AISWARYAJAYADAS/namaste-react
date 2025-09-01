import React from 'react';


export const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-section'>
                <h4>Company</h4>
                <ul>
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Blog</li>
                </ul>
                </div>

                <div className='footer-section'>
                    <h4>Support</h4>
                    <ul>
                        <li>Help Center</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className='footer-section'>
                    <h4>Follow Us</h4>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                    </ul>
                </div>
            </div>
            
            <div className='footer-bottom'>
                <p>© 2025 Food Delivery. All rights reserved.</p>
            </div>
        </div>
    );
};