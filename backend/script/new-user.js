const send = async () => {

    /* c'e' lóbbligo di una rotta???? */
    let res = await fetch("http://localhost:3000/corsi", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "",
            courses: [],
            treatments: []
        }),
    })
    let json = await res.json()
    console.log(json.status, res.status);
}
send()