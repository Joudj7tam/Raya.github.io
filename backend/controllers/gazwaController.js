import gazwaModel from "../models/gazwaModel.js";

// Add new gazwa
const addGazwa = async (req, res) => {
    const gazwa = new gazwaModel({
        name: req.body.name,
        type: req.body.type,
        area_to_open: req.body.area_to_open,
        year: req.body.year,
        leader_of_muslims: req.body.leader_of_muslims,
        era: req.body.era,
        location: req.body.location,
        number_of_muslims: req.body.number_of_muslims,
        enemy: req.body.enemy,
        number_of_enemy: req.body.number_of_enemy,
        leader_of_enemy: req.body.leader_of_enemy,
        story: req.body.story,
        result: req.body.result,
        cause: req.body.cause,
        effect: req.body.effect,
        source: req.body.source,
        country: req.body.country
    });

    try {
        await gazwa.save();
        res.json({ success: true, message: "Gazwa Added Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// bring all the gazwat
const getAllGazwa = async (req, res) => {
    try {
        const gazwat = await gazwaModel.find({});
        res.json({ success: true, data: gazwat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addGazwa, getAllGazwa };