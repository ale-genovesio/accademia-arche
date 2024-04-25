const send = async () => {

    let res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: "",
            courses: []
        }),
    })
    let json = await res.json()
    console.log(json.status, res.status);
}
send()