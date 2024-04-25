const send = async () => {
    let res = await fetch("http://localhost:3000/corsi", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: ""
        }),
    })
    let json = await res.json()
    console.log(json.status, res.status);
}
send()