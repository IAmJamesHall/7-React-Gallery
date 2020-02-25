import React from 'react';
import { a } from 'react-router-dom';

function Nav() {
    return (
        <nav className="main-nav">
            <ul>
                <li><a to='#'>Cats</a></li>
                <li><a to='#'>Dogs</a></li>
                <li><a to='#'>Computers</a></li>
            </ul>
        </nav>
    )
}

export default Nav;