import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import PhotoGrid from './PhotoGrid';

import NoPhoto from './NoPhoto';
import apiKey from '../config';

class Results extends Component {
  state = {
    query: "",
    isLoading: true,
    isFirstLoad: true,
    images: ['./loading.gif', './loading.gif', './loading.gif', './loading.gif']
  };

  getImages = () => {
    const url = 'https://www.flickr.com/services/rest/';
    axios.get(`${url}` +
      `?method=flickr.photos.search` +
      `&api_key=${apiKey}` +
      `&text=${this.state.query}` +
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
        console.log('ERROR: ', error);
      })
  }


  getQuery = async () => {
    this.setState({ isLoading: true });
    const { query } = this.props.props.match.params;
    await this.setState({ query });
    await this.getImages();
    this.setState({ isLoading: false });
  }

  render() {
    const { query } = this.props.props.match.params;
    if (query != this.state.query) {
      this.getQuery().then( res => console.log('yoyo: ', res));
    }
    
    if (this.state.isLoading === true) {
      return (<h3>Loading...</h3>);
    } else {
      return (
        <div className="photo-container">
          <h2>Results: {this.state.query} </h2>
          <PhotoGrid photos={this.state.images} />
        </div>
      )
    }
  }
}

export default Results;