import React from "react"
import facebook from "../../assets/facebook.png"
import insta from "../../assets/insta.png"
import telegram from "../../assets/telegram.png"
import mail from "../../assets/mail.png"
import "./footer.css"
import logo from "../../assets/logo-192.png";
import messages from "../../messages/messages.json";
import Text from "../Text/Text";
import Image from "../Image/Image";

const Footer = () => {
    return ( <>
    <div className="footer">
        <div className="top-footer">
        {messages.footer.map((f) => <div className="sigle-footer-text">
            <h3><Text message ={f.title}/></h3>
            <Text message ={f.description}/>
            <Text message ={f.descriptiontwo}/>
            <Text message ={f.descriptionthree}/>
        </div>)}
        </div>
    <div className="bottom-footer">
    <Image src={logo} className={"header-logo"} />
    <p>P.IVA Studio: 12768540010 | C.F. Ass.ne: 95217170109</p>
        <div className="social">
            <div className="social-icon"><Image src={facebook}/></div>
            <div className="social-icon"><Image src={insta}/></div>
            <div className="social-icon"><Image src={telegram}/></div>
            <div className="social-icon"><Image src={mail}/></div>
            
        </div>
    </div>
    </div>
    </>
    )
};

export default Footer;