import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import apiKey from './config';

// Components
import Search from './components/Search';
import Nav from './components/Nav';
import Results from './components/Results';


class App extends Component {
  loading = ['./loading.gif', './loading.gif', './loading.gif', './loading.gif'];
  state = {
    images: this.loading
    // searchText: "tree"
  };


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Search handleSubmit={this.setSearchText} />
          <Nav />
          <Route path="/search/:query"
            render={props => (<Results props={{ ...props }} />)}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
