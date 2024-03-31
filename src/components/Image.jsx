import React from "react";

const Image = ({ src, className }) => {
  return (
    <>
      <img src={src} className={className} alt=""></img>
    </>
  );
};

export default Image;
