import React from 'react';

/* returns <li> with an image */
function Photo({ url, alt }) {
  return (
    <li>
      <img src={`${url}`} alt={`${alt}`}></img>
    </li>
  );
}

export default Photo;