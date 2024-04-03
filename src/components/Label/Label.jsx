import React from "react"
import "./label.css"

const Label = ({message, classNameLabel}) => {
    return <>
    <div className={classNameLabel}>
        <span>{message}</span>
    </div>
    </>;
};

export default Label;