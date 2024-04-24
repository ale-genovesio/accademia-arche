import React from "react"
import Image from "../Image/Image";
import Text from "../Text/Text";
import pattern from "../../assets/Pattern.png"
import messages from "../../messages/messages.json";
import {ReactComponent as RoundArrow} from "../../assets/round-arrow.svg"
import "./service.css";
import { ButtonRound } from "../Button/Button";
import { Link } from "react-router-dom";
const Service = () => {
    return (
        <div className="service">
            <div className="title-service">
                <h1 className="h1-service">Altri servizi proposti dall’accademia</h1>
            </div>
            <div className="services">
                {messages.services.map((m) => <div className="single-service">
                    <div className="service-image"><Image src={pattern} className={"pattern"} /></div>
                    <h3><Text message={m.title} /></h3>
                    <p><Text message={m.description} /></p>
                    <div className="service-button">
                    <Link to="/trattamenti"><ButtonRound isInverted={true} Icon={RoundArrow} /></Link>
                    </div>
                </div>)}
            </div>
        </div>
    )
};

export default Service;