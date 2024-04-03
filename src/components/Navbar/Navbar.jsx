import React from "react"
import Label from "../Label/Label";
import messages from "../../messages/messages.json";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg"
import { ButtonSmall } from "../Button/Button";
import Text from "../Text/Text";
import Image from "../Image/Image";
import "./navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left-navbar">
                <Label message={messages?.label?.["left-label"]} classNameLabel={"label"} />
                <div className="text-navbar">
                <h1 className="h1-navbar">Scopri e prenota i nostri <span className="blue-text">trattamenti osteopatici</span></h1>
                <Text classNameText={"text-navbar"} message={messages?.description?.["label-description"]} />
                </div>
                <ButtonSmall Icon={ArrowRight} message={messages?.buttons?.["label-button"]} isInverted={true} />
            </div>
            <div className="rigth-navbar">
                <Image></Image>
                <Label></Label>
            </div>
        </div>
    );
};

export default Navbar;