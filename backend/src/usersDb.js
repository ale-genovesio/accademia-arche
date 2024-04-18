/* genera una sequenza di num e lett casuali per avere un token univoco */
import { nanoid } from "nanoid";
import fs from "node:fs/promises";



export const readUsersDb = async () => {
    let content = await fs.readFile("./usersDb.json");
    let stringContent = content.toString();
    let db = JSON.parse(stringContent);
    return db;
}

let userId = 1;
let db = await readUsersDb();
if (db.users.length) {
    userId = db.users[db.users.length - 1].id + 1;
}
export const createUser = async (req, res) => {
    let db = await readUsersDb();
    let emailExist = await userExisist(req.body.email);
    if (userIsValid(req.body) && !emailExist) {
        req.body.id = userId;
        req.body.token = nanoid()
        db.users.push(req.body);
        await fs.writeFile("./usersDb.json", JSON.stringify(db));
        res.status(201).json({ status: "ok" });
        userId++;
    } else {
        res.status(400).json({ status: "error" });
    }
};

const userIsValid = (users) => {
    return (
        users.email
    );
}

const userExisist = async (mail) => {
    let db = await readUsersDb();
    let users = db.users;
    console.log(users, 'user')
    let sameUser = users.filter((u) => u.email == mail);
    return sameUser.length > 0;
}
