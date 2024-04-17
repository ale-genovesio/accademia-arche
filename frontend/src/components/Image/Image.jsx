import React from "react";
import "./image.css"

const Image = ({ src, className }) => {
  return (
    <>
      <img src={src} className={className} alt=""></img>
    </>
  );
};

export default Image;
