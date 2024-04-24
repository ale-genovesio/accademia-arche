import React from "react"
import "./accessoAreaRiservata.css"
import DownloadCard from "../components/DownloadCard/DownloadCard";

const AccessoAreaRiservata = () => {
    return (
        <>
    <div className="accesso-areariservsta">  
    <h1>Area Riservata</h1>
    <span>Qui puoi scaricare i pdf del corso che hai tenuto</span>
    </div>
    <div className="card-accesso-areariservsta">
        <DownloadCard/>
    </div>
    </>
    )
};

export default AccessoAreaRiservata;