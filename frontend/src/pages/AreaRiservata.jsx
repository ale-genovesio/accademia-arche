import React from "react"
import "./areariservata.css"

const AreaRiservata = () => {
    return <div className="area-riservata"> 
        <h1>Area riservata</h1>
        <p>Il contenuto è protetto da password. Per visualizzarlo inserisci di seguito la password:</p>
        <div>
        <input type="text" />
        <button type="submit">Accedi</button>
    </div>
    </div>;
};

export default AreaRiservata;