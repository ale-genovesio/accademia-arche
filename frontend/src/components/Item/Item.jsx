import React from "react";
import "./item.css"
import { Link } from "react-router-dom";

const Item = ({ message, link, classNameItem }) => {
  return <Link to={link}>
  <div className={classNameItem}>{message}</div>
  </Link> 
};

export default Item;
