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

// search for gazwa by id 
const getGazwaById = async (req, res) => {
    try {
        const gazwa = await gazwaModel.findById(req.params.id);
        res.json({ success: true, data: gazwa });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// search for gazwa by country
const getGazwaByCountry = async (req, res) => {
    try {
        const country = req.query.country;

        if (!country) {
            return res.status(400).json({ success: false, message: "country is required in query" });
        }

        const gazwat = await gazwaModel.find({
            country: { $regex: country, $options: "i" }  // بحث غير حساس لحالة الأحرف
        });

        res.json({ success: true, data: gazwat });
    } catch (err) {
        console.error("❌ Error in getGazwaByCountry:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// backend/controllers/gazwaController.js
const getGazwaByYear = async (req, res) => {
    try {
        const year = req.query.year;

        if (!year) {
            return res.status(400).json({ success: false, message: "year is required in query" });
        }

        const gazwat = await gazwaModel.find({ year: parseInt(year) });
        res.json({ success: true, data: gazwat });

    } catch (err) {
        console.error("❌ Error in getGazwaByYear:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all unique years
const getAllYears = async (req, res) => {
  try {
    const years = await gazwaModel.distinct("year");
    console.log("✅ Years found:", years); // ← اضف هذا
    const sortedYears = years.sort((a, b) => a - b);
    res.json({ success: true, data: sortedYears });
  } catch (err) {
    console.error("❌ Error in getAllYears:", err.message); // ← واضف هذا
    res.status(500).json({ success: false, message: err.message });
  }
};



export { addGazwa, getAllGazwa, getGazwaById, getGazwaByCountry, getGazwaByYear, getAllYears};