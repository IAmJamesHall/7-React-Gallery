import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';

import './App.css';

import apiKey from './config';

// Components
import Search from './components/Search';
import Nav from './components/Nav';
import Results from './components/Results';


class App extends Component {
  state = {
    images: ['https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150'],
    searchText: "tree"
  };

  getImages = () => {
    
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
    this.getImages();
    return (
      <div className="container">
        <Search />
        <Nav />
        <Results images={this.state.images} />
      </div>
    )
  }
}

export default App;
