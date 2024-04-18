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
    /* .some serve per avere come risultato un booleano */
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