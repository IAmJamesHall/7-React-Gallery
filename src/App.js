import React from 'react';

import './App.css';

// Components
import Search from './components/Search';
import Nav from './components/Nav';
import Results from './components/Results';
import NoResults from './components/NoResults';


function App() {
  return (
    <div className="container">
      <Search />
      <Nav />
      <Results />
    </div>
  )
}

export default App;
