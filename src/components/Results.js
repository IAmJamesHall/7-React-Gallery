import React, { Component } from 'react';
import PhotoGrid from './PhotoGrid';
import NoPhoto from './NoPhoto';

class Results extends Component {
    state = {
        query: "",
        isLoading: true
    };

    // previous (semi-working) solution
    // getQuery() {
    //     const query = this.props.match.params.query;
    //     this.setState({query}, () => {
    //         this.props.setSearchText(query, this.props.getImages)
    //         this.props.getImages(query);
    //     })
    // }

    // shouldComponentUpdate(nextProps) {
    //     const query = nextProps.match.params.query;
    //     return (this.state.query !== query);
    // }

    getQuery = async () => {
        this.setState({isLoading: true});
        const { query } = this.props.props.match.params;
        await this.props.searchForQuery(query);
        this.setState({query, isLoading: false});
    }


    componentDidMount() {
        this.getQuery().then((res)=>console.log('yoyo: ', res));
    }

     render() {
         if (this.state.isLoading === true) {
             return (<h3>Loading...</h3>);
         } else {
            return (
                <div className="photo-container">
                    <h2>Results: {this.state.query} </h2>
                    <PhotoGrid photos={this.props.imageURLs} />
                </div>
            )
         }
        
    }

}

export default Results;