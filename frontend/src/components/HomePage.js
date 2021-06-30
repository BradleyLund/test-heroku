//this is a basic Homepage component with a navbar making it easy for users to scroll between different parts of the webpage

import React from 'react';
import logo from './images/apple_logo.png';
import mainLogo from './images/istore.png'

function HomePage() {
    return (
        <div className='navbar-div'>
            <nav className='navbar navbar-expand-lg navbar-dark'>
                <div className='logo'>
                    <img style={{ height: 30 }} src={logo} alt="logo" />
                </div>
                <ul className='navbar-nav list-group'>
                    <li className='nav-item'><a href='#Home'>Home</a></li>
                    <li className='nav-item'><a href='#Search'>Search</a></li>
                    <li className='nav-item'><a href='#Favs'>Favourites</a></li>
                </ul>
            </nav>
            <img src={mainLogo} alt="" />
        </div>
    )
}

export default HomePage;

