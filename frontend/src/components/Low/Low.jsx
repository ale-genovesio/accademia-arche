import React from "react"
import "./low.css"
import Image from "../Image/Image";
import Text from "../Text/Text";
import messages from "../../messages/messages.json";

const Low = () => {
    return (
    <div className="low">
   <Image/>
   <h1 className="h1-low">La nostra filosofia al tuo servizio</h1>
    <Text message={messages?.description?.["text-low"]}/>
    <Text message={messages?.description?.["text-low-two"]}/>
    <Text message={messages?.description?.["text-low-three"]}/>
    <Text message={messages?.description?.["text-low-for"]}/>
    </div>
    )
};

export default Low;