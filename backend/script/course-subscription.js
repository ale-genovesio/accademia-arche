import Description from "../../frontend/src/components/Description/Description";

const send = async () => {

    /* c'e' lóbbligo di una rotta???? */
    let res = await fetch("http://localhost:3000/corsi/iscrizione", {
        method: "POST",
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
            },
            name: "",
            description: "",
            image: ""
        }),
    })
    let json = await res.json()
    console.log(json.status, res.status);
}
send()