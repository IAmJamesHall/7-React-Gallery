import React from 'react';
import { NavLink } from 'react-router-dom';

/* quick nav links for easy searching */
function Nav() {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/search/water'>Water</NavLink></li>
        <li><NavLink to='/search/sand'>Sand</NavLink></li>
        <li><NavLink to='/search/eggs'>Eggs</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav;