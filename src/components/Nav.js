import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="main-nav">
      <ul>
        <li><Link to='/search/cats'>Cats</Link></li>
        <li><Link to='/search/dogs'>Dogs</Link></li>
        <li><Link to='/search/computers'>Computers</Link></li>
      </ul>
    </nav>
  )
}

export default Nav;