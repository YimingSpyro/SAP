const announcementService = require("../services/announcementService");


exports.getAllAnnouncements = async (req, res, next) => {
    try {
        let results = await announcementService.getAllAnnouncements();
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            console.log('Get All Announcements', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};