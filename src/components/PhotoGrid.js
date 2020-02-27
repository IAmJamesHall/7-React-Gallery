import React from 'react';

import Photo from './Photo';

function PhotoGrid({photos}) {
    let photoElements = [];
    for (let i = 0; i < photos.length; i++) {
        photoElements.push(<Photo url={photos[i]} key={i} />);
    }

    return (
        
            <ul>
                {photoElements}
            </ul>
        
    )
}

export default PhotoGrid;