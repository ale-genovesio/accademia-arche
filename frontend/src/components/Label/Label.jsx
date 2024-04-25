import React from "react"
import "./label.css"

const Label = ({message, classNameLabel, circle}) => {
    return <>
    <div className={`${classNameLabel} label`}>
       <div className={circle}></div>
        <span>{message}</span>
    </div>
    </>;
};

export default Label;