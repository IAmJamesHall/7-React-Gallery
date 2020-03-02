import React, { useState, useEffect } from 'react';
import PhotoGrid from './PhotoGrid';

import NoPhoto from './NoPhoto';

const Results = props => {

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlQuery = props.match.params.query;
    if (urlQuery != props.query) {
      getQuery(urlQuery).then(res => console.log('yoyo: ', res));
    }
  });

  const getQuery = async (query) => {
    // setIsLoading(true);
    await props.setQuery(query)
    await props.getImages();
    document.title = `${query} | React Gallery App`
    // setIsLoading(false);
  }


  return (
    <div className="photo-container">
      <h2>Results: {props.query} </h2>
      <PhotoGrid photos={props.images} />
    </div>
  )
}

export default Results;