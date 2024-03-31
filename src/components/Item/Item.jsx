import React from "react";
import "./item.css"

const Item = ({ message, classNameItem }) => {
  return <div className={classNameItem}>{message}</div>;
};

export default Item;
