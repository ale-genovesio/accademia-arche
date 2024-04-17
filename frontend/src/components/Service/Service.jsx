import React from "react"
import Image from "../Image/Image";
import Text from "../Text/Text";
import pattern from "../../assets/Pattern.png"
import messages from "../../messages/messages.json";
import "./service.css";
const Service = () => {
    return (
        <>
        <div className="title-service">
        <h1>Altri servizi proposti dall’accademia</h1>
        </div>
    <div className="service">
        {messages.services.map((m) => <div className="single-service">
       <div className="service-image"><Image src={pattern} className={"pattern"}/></div> 
        <h3><Text message={m.title}/></h3>
        <p><Text message={m.description}/></p>
        </div> )}
    </div>
    </>
    )
};

export default Service;