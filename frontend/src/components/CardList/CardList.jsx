import React from "react"
import { Link } from "react-router-dom";
import Image from "../Image/Image";

const CardList = ({ cardList, pathname }) => {
    return <>
    {cardList.length ? 
        cardList.map(cardInfo => 
            <div>
                <Link to={`${pathname}/${cardInfo.id}`}>
                    <div>
                <span>{cardInfo.name}</span> 
                <span>{cardInfo.description}</span> 
                    <Image src={cardInfo.image}/>
                </div>
                </Link>
            </div>
        )
        : null
    }
    </>
};

export default CardList;