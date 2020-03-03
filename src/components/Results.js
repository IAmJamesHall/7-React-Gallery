import React, { useEffect } from 'react';

// Components
import PhotoGrid from './PhotoGrid';
import NoPhoto from './NoPhoto';

/* returns grid of photos based on route in props */
const Results = props => {

  /*  run after render()
      checks if there is a new url
      if so, runs getQuery()  */
  useEffect(() => {
    const urlQuery = props.match.params.query;
    if (urlQuery !== props.query) {
      getQuery(urlQuery).then(res => console.log('yoyo: ', res));
    }
  });

  // sets query state in App, then runs fetching function
  const getQuery = async (query) => {
    await props.setQuery(query)
    await props.getImages();

    // set document title
    document.title = `${query} | React Gallery App`
  }


  if (props.images.length > 0) { //if images were returned
    return (
      <div className="photo-container">
        <h2>Results: {props.query} </h2>
        <PhotoGrid photos={props.images} query={props.query}/>
      </div>
    )
  } else { //no images returned
    return <NoPhoto />;
  }

}

export default Results;