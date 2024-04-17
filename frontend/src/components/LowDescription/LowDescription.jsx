import React from "react"
import "./lowDescription.css"
import messages from "../../messages/messages.json";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg"
import { ReactComponent as Heart } from "../../assets/heart.svg"
import { ButtonSmall } from "../Button/Button";


const LowDescription = () => {
    return (
        <div className="low-description">
            <div>
                <h1 className="h1-low-desc">Principali vantaggi del <span className="blue-text">trattamento</span></h1>
                <ButtonSmall Icon={ArrowRight} message={messages?.buttons?.["low-description-button"]} isInverted={true}></ButtonSmall>
            </div>
            <div className="advantages">
                {messages.advantages.map((a) =>
                    <div>
                        <Heart></Heart>
                        <h3>{a.title}</h3>
                        <p>{a.description}</p>
                    </div>
                )}
            </div>


        </div>
    )
}

export default LowDescription;