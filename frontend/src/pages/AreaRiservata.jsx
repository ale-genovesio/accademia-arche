import React, { useState } from "react"
import "./areariservata.css"
import { useNavigate } from "react-router-dom";
import EmailForm from "../components/EmailForm/EmailForm";


const AreaRiservata = ({loggedInToken, setLoggedInToken}) => {
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
   
    
    return <div> 

        <div>
        {loggedInToken ? 
                    <>Lista dei corsi a cui lútente e'iscritto</>
                :
                <EmailForm setLoggedInToken={setLoggedInToken}/>
        }
        </div>

    <div className="area-riservata">
        <h1>Accedi per scaricare i contenuti dei tuoi corsi</h1>
        <p>La password per accedere ai contenuti dei tuoi corsi é quella fornita dal personale alla fine del corso che hai frequentato</p>
        <div>
            <form action="" onSubmit={(e) =>handleSubmit(e)}> 
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Accedi</button>
            </form>
        </div>
    </div>

    </div>
};

export default AreaRiservata;