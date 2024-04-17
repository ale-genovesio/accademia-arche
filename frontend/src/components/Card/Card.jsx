import React from "react"
import {ReactComponent as Heart} from "../../assets/heart.svg"
/* import Text from "../Text/Text";
import {ButtonSmall} from "../Button/Button"; */
import messages from "../../messages/messages.json";
import "./card.css"

const Card = () => {
    return ( 
    <div className="card">
    
    {messages.card.map((c) => <div className="single-card">
        <Heart className="heart"></Heart>
        <h3>{c.title}</h3>
        <p>{c.description}</p>
        <p>{c.doc}</p>
        <h2>{c.price}</h2>
        </div> )}
   {/*  <ButtonSmall></ButtonSmall> */}

    </div>
    
)
};

export default Card;