import fs from "node:fs/promises";

export const readDb = async () => {
    let content = await fs.readFile("./db.json");
    let stringContent = content.toString();
    let db = JSON.parse(stringContent);
    return db;
}

const passwordExisist = async (password) => {
    let db = await readDb();
    let passwords = db.password;
    /* .some serve per avere come risultato un booleano, e' una find che restituisce true o false al posto di un oggettp*/
    let samePassword = passwords.some((p) => p.pass == password);
    return samePassword;
}

export const passwordAccepted = async (req, res) => {
    let passData = req.body;
    let passExists = await passwordExisist(passData.password);
    if (passExists) {
        res.json({ status: "ok" });
    } else {
        res.status(400).json({ status: "password not found" });
    }
}

export const getServices = async (req, res) => {
    let db = await readDb();
    res.json({status: "ok", services: db.services})
}

export const getPdfList = async (req, res) => {
    let db = await readDb();
    const password = db.password.find(passw => passw.pass === req.params.id)
    if(password) {
        res.json({status: "ok", pdfList: password.pdf})
        return
    }
    else{
        res.json({status: "error", message: `no password found with key: ${req.params.id}`})
    }
}

