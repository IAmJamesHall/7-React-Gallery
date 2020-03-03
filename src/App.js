import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js'; //used for parsing xml response from flickr
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css'; //app styling

import apiKey from './config'; //flickr key

// Components
import Search from './components/Search';
import Nav from './components/Nav';
import Results from './components/Results';
import ErrorPage from './components/ErrorPage';


class App extends Component {
  state = {
    images: [],
    query: ""
  };


  //main data fetching function
  getImages = () => {
    // reset image state
    this.setState({images: []});

    //fetch data from flickr
    const url = 'https://www.flickr.com/services/rest/';
    axios.get(`${url}` +
      `?method=flickr.photos.search` +
      `&api_key=${apiKey}` +
      `&text=${this.state.query}` +
      `&per_page=24`)
      .then(response => {
        // strip out unneeded info from response
        let images;
        parseString(response.data, (err, parsed) => {
          images = parsed.rsp.photos[0].photo;
        })
        return images;
      })
      .then(photos => {

        //extract data from response and construct URLs
        const imageURLs = [];
        if (photos) {
          for (let i = 0; i < photos.length; i++) {
            const {
              farm,
              id,
              server,
              secret
            } = photos[i].$;

            const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
            imageURLs.push(url);
          }
          return imageURLs;
        } else {
          return [];
        }
      })
      .then(imageURLs => {
        // set imageURLs to state
        this.setState({
          images: imageURLs
        })
      })
      .catch(error => {
        console.log('ERROR: ', error);
      })
  }

  // helper function; called from child component
  setQuery = (query) => {
    this.setState({query});
  }
  


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Search handleSubmit={this.setSearchText} />
          <Nav />
          <Switch>
            {/* if on home page, redirect to a results page*/}
            <Route exact path="/" render={ () => <Redirect to={'/search/water'} />}/>
          <Route path="/search/:query"
            render={props => (
            <Results 
              match={props.match}
              images={this.state.images}
              query={this.state.query}
              getImages={this.getImages}
              setQuery={this.setQuery}
            />)}
          />
          <Route path="/" component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
