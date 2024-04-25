const send = async () => {
    let res = await fetch(`http://localhost:3000/corsi/modifica`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: "",
            selectedDatas: {
                id: "",
                date: "",
                hour: ""
            }
        }),
    });
    let json = await res.json();
    console.log(json.status, res.status);
}
send();