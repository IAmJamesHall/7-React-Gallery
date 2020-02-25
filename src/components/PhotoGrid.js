import React from 'react';

import Photo from './Photo';

function PhotoGrid({photos}) {
    let photoElements = [];
    for (let i = 0; i < photos.length; i++) {
        photoElements.push(<Photo url={photos[i]} />);
    }

    return (
        <div className="photo-container">
            <ul>
                {photoElements}
            </ul>
        </div>
    )
}

export default PhotoGrid;