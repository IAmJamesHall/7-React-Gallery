import React from 'react';

function Photo({url}) {
    return (
        <li>
            <img src={`${url}`}></img>
        </li>
    );
}

export default Photo;