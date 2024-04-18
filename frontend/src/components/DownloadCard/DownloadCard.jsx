import React from "react"
import {ButtonSmall} from "../Button/Button";
import messages from "../../messages/messages.json";
import {ReactComponent as Download} from "../../assets/download.svg"
import "./downloadCard.css"

const DownloadCard = () => {
    return ( <div className="download-card">
        <h3>Lezione 1 - blabla</h3>
        <p>Lorem ipsum, dolor sit amet consectetur <br /> adipisicing elit. Molestiae, molestias?</p>
        <div className="download-button">
             <ButtonSmall message={messages?.buttons?.["area-riservata-download"]} Icon={Download}/>
        </div>
    </div>
    )
};

export default DownloadCard;