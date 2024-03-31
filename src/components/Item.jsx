import React from "react";

const Item = ({ message, classNameItem }) => {
  return <div className={classNameItem}>{message}</div>;
};

export default Item;
