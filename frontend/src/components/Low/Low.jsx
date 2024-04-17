import React from "react"
import "./low.css"
import Image from "../Image/Image";
import Text from "../Text/Text";
import messages from "../../messages/messages.json";

const Low = () => {
    return (
    <div className="low">
   <Image/>
    <Text message={messages?.description?.["text-low"]}/>
    <Text message={messages?.description?.["text-low-two"]}/>
    <Text message={messages?.description?.["text-low-three"]}/>
    <Text message={messages?.description?.["text-low-for"]}/>
    </div>
    )
};

export default Low;