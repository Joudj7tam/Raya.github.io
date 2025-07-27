import gazwaModel from "../models/gazwaModel.js";

// Add a new gazwa document to the database
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
        await gazwa.save();  // Save new gazwa to DB
        res.json({ success: true, message: "Gazwa Added Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get a paginated list of gazwa documents with optional filters and sorting
const getAllGazwa = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Filters and sorting params from query string
        const { type, era, result, search, year, sortOrder } = req.query;
        const sortDirection = sortOrder === 'desc' ? -1 : 1;

        const filter = {};

        // Apply filters if provided
        if (type) filter.type = type;
        if (era) filter.era = era;
        if (result) filter.result = result;
        if (search) filter.name = { $regex: search, $options: "i" }; // Case-insensitive search by name
        if (year !== undefined && year !== '') {
            const parsedYear = parseInt(year);
            if (!isNaN(parsedYear)) {
                filter.year = parsedYear;
            }
        }

        // Query DB excluding some heavy fields for listing
        const gazwat = await gazwaModel
            .find(filter, {
                story: 0,
                cause: 0,
                effect: 0,
                source: 0,
                country: 0,
                area_to_open: 0,
                leader_of_muslims: 0,
                location: 0,
                number_of_muslims: 0,
                enemy: 0,
                number_of_enemy: 0,
                leader_of_enemy: 0
            })
            .sort({ year: sortDirection }) // Sort by year ascending/descending
            .skip(skip) // Pagination skip
            .limit(limit); // Pagination limit

        const total = await gazwaModel.countDocuments(filter); // Total count for pagination

        res.json({ success: true, data: gazwat, total, page, limit });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single gazwa by its MongoDB _id
const getGazwaById = async (req, res) => {
    try {
        const gazwa = await gazwaModel.findById(req.params.id);
        res.json({ success: true, data: gazwa });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search gazwa by country (case-insensitive partial match)
const getGazwaByCountry = async (req, res) => {
    try {
        const country = req.query.country;

        if (!country) {
            return res.status(400).json({ success: false, message: "country is required in query" });
        }

        const gazwat = await gazwaModel.find({
            country: { $regex: country, $options: "i" }
        });

        res.json({ success: true, data: gazwat });
    } catch (err) {
        console.error("❌ Error in getGazwaByCountry:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get gazwa by a specific year
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

// Get all unique years from the gazwa collection, sorted ascending
const getAllYears = async (req, res) => {
    try {
        const years = await gazwaModel.distinct("year");
        const sortedYears = years.sort((a, b) => a - b);
        res.json({ success: true, data: sortedYears });
    } catch (err) {
        console.error("❌ Error in getAllYears:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

export { addGazwa, getAllGazwa, getGazwaById, getGazwaByCountry, getGazwaByYear, getAllYears };
