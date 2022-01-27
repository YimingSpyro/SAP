const moduleService = require('../services/moduleService')

module.exports.getEveryModule = async (req, res) => {
    try {
        let results = await moduleService.getEveryModule();
        console.log('Fetching All Modules');
        return res.status(200).json(results);
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Input" });
    }
};
