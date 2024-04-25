import React from "react"
import "./text.css"

const Text = ({message, classNameText}) => {
    return <>
    <p className= {classNameText}>{message}</p>
    </>;
};

export default Text;