import React from 'react';

// Component
import Photo from './Photo';


/* returns grid of photos */
function PhotoGrid({photos, query}) {
    let photoElements = [];
    for (let i = 0; i < photos.length; i++) {
        photoElements.push(<Photo url={photos[i]} alt={query} key={i} />);
    }

    return (<ul>{photoElements}</ul>);
}

export default PhotoGrid;