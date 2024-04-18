import React, { useState } from "react"

const Courses = () => {
    const [isLogged, setIsLogged] = useState(false)
    const [email,  setEmail] = useState("")

    const handleSubmit =  (e) => {
        setIsLogged(!isLogged)
        e.preventDefault()
        if(email.trim() !== "") {

       fetch("http://localhost:3000/corsi", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email
        }),
    })
        }
    }

    return <div>
        <section>
            <h1>Corso X</h1>
            <p>Descrizione corso x</p>
        </section>
        <section>
            {isLogged ? 
                    <>List of courses</>
                :
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="">Insert your Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
        }
        </section>
    </div>;
};

export default Courses;