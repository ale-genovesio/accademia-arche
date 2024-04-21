import express from "express"
import bodyParser from "body-parser"
const app = express()
const port = 3000
app.use(bodyParser.json())

import cors from "cors"
const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true
}


app.use(cors(corsOptions))

import { getAllTreatments, getTreatmentDetail } from "./routes-treatments.js"
import { getAllCourses, getCourseDetail } from "./routes-courses.js"
import { passwordAccepted } from "./db.js"
import { createUser, subscribeUserToCourse } from "./usersDb.js"

app.post('/accesso-areariservata', passwordAccepted);
app.post('/user', createUser);
app.get("/corsi", getAllCourses)
app.get("/corsi/:id", getCourseDetail)
app.get("/trattamenti", getAllTreatments)
app.get("/trattamenti/:id", getTreatmentDetail)
app.post("/corsi/iscrizione", subscribeUserToCourse)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
