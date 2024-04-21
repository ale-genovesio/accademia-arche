import React, {useState} from "react"

const EmailForm = ({ setLoggedInToken, setUserCourses }) => {
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
        localStorage.setItem("userCourses", JSON.stringify(json.courses));
        setLoggedInToken(json.token);
        setUserCourses(json.courses)
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