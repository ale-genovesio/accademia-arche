import { readDb } from "./db.js";

const omit = (obj, arr) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => !arr.includes(k)));

export const getAllCourses = async (req, res) => {
    let foundCourses = [];
    let db = await readDb();
    let keys = Object.keys(req.query);
    console.log(db.course);
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

        res.json({ status: "ok", course: omit(course, ["pdf"]) });

    }
    else {
        res.status(400).json({ status: `no course found with this id: ${req.params.id}` });
    }
};