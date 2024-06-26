import { readDb } from "./db.js";

export const getAllTreatments = async (req, res) => {
    let foundTreatments = [];
    let db = await readDb();
    let keys = Object.keys(req.query);
    if (keys.length == 0) {
        res.json({ status: "ok", treatments: db.treatments });
        return;
    }
    for (let i = 0; i < db.treatments.length; i++) {
        let treatment = db.treatments[i];
        let count = 0;
        for (let k = 0; k < keys.length; k++) {
            let key = keys[k];
            if (treatment[key] == req.query[key]) {
                count++;
            }
        }
    }
    res.json({ status: "ok", treatments: foundTreatments });
};


export const getTreatmentDetail = async (req, res) => {
    let db = await readDb();
    let treatment = db.treatments.find((treatment) => treatment.id == req.params.id);
    if (treatment) {

        res.json({ status: "ok", treatment: treatment });

    }
    else {
        res.status(400).json({ status: `no treatment found with this id: ${req.params.id}` });
    }
};

export const getSuggestedTreatments = async (req, res) => {
    let db = await readDb();
    let suggestedTreatments = db.suggestedTreatments
    if (suggestedTreatments.length) {

        res.json({ status: "ok", suggestedTreatments: suggestedTreatments });

    }
    else {
        res.status(400).json({ status: `no suggested treatments found` });
    }
};