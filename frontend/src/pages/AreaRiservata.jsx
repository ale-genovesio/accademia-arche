import React, { useState } from "react"
import "./areariservata.css"
import { useNavigate } from "react-router-dom";


const AreaRiservata = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password.trim() !== "") {

        const res = await fetch("http://localhost:3000/accesso-areariservata", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: password
        }),
    })
        if(res.status < 400) {
            navigate("/accesso-areariservata")
        }
        }
    }
   
    
    return <div className="area-riservata"> 
        <h1>Area riservata</h1>
        <p>Il contenuto è protetto da password. Per visualizzarlo inserisci di seguito la password:</p>
        <div>
            <form action="" onSubmit={(e) =>handleSubmit(e)}> 
             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Accedi</button>
        </form>
      
    </div>

    </div>
};

export default AreaRiservata;