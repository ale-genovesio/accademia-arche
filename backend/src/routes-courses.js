import { readDb } from "./db.js";

/* let albumId = 1;
let db = await readDb();
if (db.albums.length) {
    albumId = db.albums[db.albums.length - 1].id + 1;
}
export const createAlbum = async (req, res) => {
    let db = await readDb();
    let nameExists = await albumNameExisist(req.body.name);
    if (albumIsValid(req.body) && !nameExists) {
        req.body.id = albumId;
        db.albums.push(req.body);
        await fs.writeFile("./db.json", JSON.stringify(db));
        res.status(201).json({ status: "ok" });
        albumId++;
    } else {
        res.status(400).json({ status: "error" });
    }
}; */