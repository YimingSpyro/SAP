const courseService = require('../services/courseService')

module.exports.getAllCourses = async (req, res) => {
    try {
        let results = await courseService.getAllCourses();
        console.log('Fetching Available Courses');
        return res.status(200).json(results);
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Input" });
    }
};