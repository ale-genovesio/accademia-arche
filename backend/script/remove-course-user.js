const send = async () => {
    let res = await fetch("http://localhost:3000/user", {
        method: "DELETE",
    })
    let json = await res.json()
    console.log(json.status, res.status);
}
send()