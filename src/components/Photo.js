import React from "react";

function Photo({ url }) {
  return (
    <li>
      <img src={`${url}`} alt=""></img>
    </li>
  );
}

export default Photo;
