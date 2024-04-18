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

import { passwordAccepted } from "./db.js"
import { createUser } from "./usersDb.js"

app.post('/accesso-areariservata', passwordAccepted);
app.post('/corsi', createUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
