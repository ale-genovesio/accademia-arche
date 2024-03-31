import React from "react";
import logo from "../../assets/logo-192.png";
import {ReactComponent as ArrowRight} from "../../assets/arrow-right.svg"
import messages from "../../messages/messages.json";
import Item from "../Item";
import {ButtonSmall} from "../Button/Button";
import Image from "../Image/Image";
import "./header.css"

const Header = () => {
  return (
    <div className="header">
      <Image src={logo} className={"header-logo"} />
      <div className="container-header-item">
        {messages.header.map((itemMessage) => (
          <Item message={itemMessage} classNameItem={"header-item"} />
        ))}
      </div>
      <div className="container-header-button">
       {/*  i punti interrogativi evitano che il codice si rompa se il percorso non e'valido (se il percorso non esiste piu'nel json) */}
        <ButtonSmall message={messages?.buttons?.["header-button"]} Icon={ArrowRight}/>
      </div>
    </div>
  );
};

export default Header;
