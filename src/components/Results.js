import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import PhotoGrid from './PhotoGrid';

import NoPhoto from './NoPhoto';
import apiKey from '../config';

class Results extends Component {
  state = {
    isLoading: true
  };

  


  getQuery = async () => {
    this.setState({ isLoading: true });
    const { query } = this.props.match.params;
    await this.props.getImages();
    this.setState({ isLoading: false });
  }

  render() {
    const urlQuery = this.props.match.params.query;
    if (urlQuery != this.props.query) {
      this.getQuery().then( res => console.log('yoyo: ', res));
    }
    
    if (this.state.isLoading === true) {
      return (<h3>Loading...</h3>);
    } else {
      return (
        <div className="photo-container">
          <h2>Results: {this.props.query} </h2>
          <PhotoGrid photos={this.props.imgURLs} />
        </div>
      )
    }
  }
}

export default Results;