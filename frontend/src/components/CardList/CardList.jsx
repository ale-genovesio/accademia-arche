import React from "react"
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import "./cardlist.css"

const CardList = ({ cardList, pathname }) => {
    return <div className="cardlist">
    {cardList.length ? 
        cardList.map(cardInfo => 
            <div className="sigle-cardlist">
                <Link to={`${pathname}/${cardInfo.id}`}>
                    <div className="container-item-cardlist">
                        <div className="container-image-cardlist">
                    <Image src={cardInfo.image} className={"image-cardlist"}/>
                        </div>
                <h2 className="title-cardlist">{cardInfo.name}</h2> 
                <span className="p-cardlist">{cardInfo.description}</span> 
                </div>
                </Link>
            </div>
        )
        : null
    }
    </div>
};

export default CardList;