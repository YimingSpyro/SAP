const uploadsService = require('../services/uploadsService')
const staffService = require('../services/staffService')
const semesterService = require('../services/semesterService')

module.exports.getAllSemesters = async (req, res) => {
    try {
        let results = await semesterService.getAllSemesters();
        console.log('Fetching Available Semesters');
        return res.status(200).json(results);
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Input" });
    }
};