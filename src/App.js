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
  state = {
    images: ['https://via.placeholder.com/220',
    './loading.gif',
    'https://via.placeholder.com/220',
    'https://via.placeholder.com/220'],
    searchText: "tree"
  };

  loading = ['./loading.gif','./loading.gif','./loading.gif','./loading.gif'];


  getImages = () => {
    this.setState({images: this.loading})

    const url = 'https://www.flickr.com/services/rest/';
    axios.get(`${url}` + 
              `?method=flickr.photos.search` +
              `&api_key=${apiKey}` + 
              `&text=${this.state.searchText}` +
              `&per_page=24`)
    .then(response => {
      let photos;
      parseString(response.data, (err, parsed) => {
        photos = parsed.rsp.photos[0].photo;
      })
      return photos;
    })
    .then(photos => {
      const photoURLs = [];
      for (let i = 0; i < photos.length; i++) {
        const {
          farm,
          id,
          server,
          secret
        } = photos[i].$;

        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        photoURLs.push(url);
      }
      return photoURLs;
    })
    .then(photoURLs => {
      this.setState({
        images: photoURLs
      })
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
  }





  render() {
    
    return (
      <BrowserRouter>
      <div className="container">
        <Search />
        <Nav />
        
        <Results images={this.state.images} />
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
