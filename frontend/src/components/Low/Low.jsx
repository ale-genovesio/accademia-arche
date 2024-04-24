import React from "react"
import "./low.css"
import Image from "../Image/Image";
import Text from "../Text/Text";
import messages from "../../messages/messages.json";

const Low = () => {
    return (
    <div className="low">
   <Image className={"low-image"} src={"https://www.accademia-arche.it/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-12-at-16.45.31-672x372.jpeg"}/>
    <div className="p-low">
    <Text message={messages?.description?.["text-low"]}/>
    <Text message={messages?.description?.["text-low-two"]}/>
    <Text message={messages?.description?.["text-low-three"]}/>
    <Text message={messages?.description?.["text-low-for"]}/>
    </div>
    
   </div>
    )
};

export default Low;