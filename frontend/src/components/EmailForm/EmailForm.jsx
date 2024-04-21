import React, {useState} from "react"

const EmailForm = ({ setLoggedInToken }) => {
    const [email,  setEmail] = useState("")

    const handleSubmit =  (e) => {
        e.preventDefault()
        if(email.trim() !== "") {

       fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email
        }),
    }).then(res => res.json()).then((json) => {
        localStorage.setItem("loggedInToken", json.token);
        setLoggedInToken(json.token)
    })
        }
    }


    return <form action="" onSubmit={handleSubmit}>
    <label htmlFor="">Insert your Email</label>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <button type="submit">Submit</button>
</form>;
};

export default EmailForm;