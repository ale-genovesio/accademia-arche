/* genera una sequenza di num e lett casuali per avere un token univoco */
import { nanoid } from "nanoid";
import fs from "node:fs/promises";

// funzione  che permette di creare un nuovo oggetto (fromEntries()) escludendo delle chiavi (arr) specificate da un oggetto esistente (obj)
const omit = (obj, arr) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => !arr.includes(k)));



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
        req.body.courses = []
        db.users.push(req.body);
        await fs.writeFile("./usersDb.json", JSON.stringify(db));
        res.status(201).json({ status: "ok", token: req.body.token, courses: req.body.courses });
        userId++;
    } else {
        const user = db.users.find(user => user.email === req.body.email)
        res.status(200).json({ status: "ok", token: user.token, courses: user.courses });
    }
};

export const subscribeUserToCourse = async (req, res) => {
    let db = await readUsersDb();
    if (tokenIsValid(db.users, req.body.token)) {
        const currentUser = db.users.find(user => user.token === req.body.token)
        currentUser.courses.push(omit(req.body, "token"));
        await fs.writeFile("./usersDb.json", JSON.stringify(db));
        res.status(201).json({ status: "ok", courses: currentUser.courses });
    } else {
        res.status(400).json({ status: "email non esistente" });
    }
};

export const tokenIsValid = (users, token) => {
    return (
        users.find(user => user.token === token)
    )
}

const userIsValid = (users) => {
    return (
        users.email
    );
}

const userExisist = async (mail) => {
    let db = await readUsersDb();
    let users = db.users;
    let sameUser = users.filter((u) => u.email == mail);
    return sameUser.length > 0;
}


export const getAllUsers = async (req, res) => {
    let foundUsers = [];
    let db = await readUsersDb();
    let keys = Object.keys(req.query);
    if (keys.length == 0) {
        res.json({ status: "ok", users: db.users });
        return;
    }
    for (let i = 0; i < db.users.length; i++) {
        let user = db.users[i];
        let count = 0;
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (user[key] == req.query[key]) {
                count++;
            }
        }
    }
    res.json({ status: "ok", users: foundUsers });
};

export const getUserCourses = async (req, res) => {
    let db = await readUsersDb();
    let user = db.users.find(user => user.token === req.params.id)
    if (user) {
        res.json({ status: "ok", courses: user.courses });
        return;
    }
    res.json({ status: "error", message: "no user found with this token" });
};

export const removeCourseFromUser = async (req, res) => {
    let db = await readUsersDb();
    let users = db.users
    const user = users.find(user => user.token === req.body.token)
    if (user) {
        let userCourses = user.courses
        userCourses = user.courses.filter((course) => course.selectedDatas.id !== req.body.id);
        db.users.find(user => user.token === req.body.token).courses = userCourses
        await fs.writeFile("./usersDb.json", JSON.stringify(db));
        res.json({ status: "ok", courses: userCourses });
    } else {
        res.status(404).json({ status: "error" });
    }
}