import { readDb } from "./db.js";
import { readUsersDb, tokenIsValid } from "./usersDb.js";
import fs from "node:fs/promises";

export const getAllCourses = async (req, res) => {
    let foundCourses = [];
    let db = await readDb();
    let keys = Object.keys(req.query);
    if (keys.length == 0) {
        res.json({ status: "ok", courses: db.course.map(course => { return { name: course.name, description: course.description, image: course.image, id: course.id } }) });
        return;
    }
    for (let i = 0; i < db.course.length; i++) {
        let course = db.course[i];
        let count = 0;
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (course[key] == req.query[key]) {
                count++;
            }
        }
    }
    res.json({ status: "ok", courses: foundCourses });
};

export const getCourseDetail = async (req, res) => {
    let db = await readDb();
    let course = db.course.find((course) => course.id == req.params.id);
    if (course) {

        res.json({ status: "ok", course: course });

    }
    else {
        res.status(400).json({ status: `no course found with this id: ${req.params.id}` });
    }
};

export const editUserCourse = async (req, res) => {
    let db = await readUsersDb();
    if (tokenIsValid(db.users, req.body.token)) {
        const users = db.users
        const courses = users.find(user => user.token === req.body.token).courses
        let course = courses.find(course => course.selectedDatas.id === req.body.selectedDatas.id)

        course.selectedDatas = req.body.selectedDatas

        db.users.find(user => user.token === req.body.token).courses = courses
        
        await fs.writeFile("./usersDb.json", JSON.stringify(db));
        res.status(201).json({ status: "ok", courses: courses });
    } else {
        res.status(400).json({ status: "email non esistente" });
    }
};