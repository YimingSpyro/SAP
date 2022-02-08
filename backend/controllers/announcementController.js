const announcementService = require("../services/announcementService");


exports.getAllAnnouncements = async (req, res, next) => {
    let order = req.query.order;
    try {
        let results = await announcementService.getAllAnnouncements(order);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log('Get All Announcements', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};

exports.createAnnouncement = async (req, res, next) => {
    let announcement_type = req.body.announcement_type;
    let announcement_roles = req.body.announcement_roles;
    let announcement_start = req.body.announcement_start;
    let announcement_end = req.body.announcement_end;
    let announcement_message = req.body.announcement_message;
    let announcement_subject = req.body.announcement_subject;
    let data = [announcement_type,announcement_roles,announcement_start,announcement_end,announcement_message,announcement_subject]
    try {
        let results = await announcementService.createAnnouncement(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            ////console.log('Create Announcement', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};

exports.updateAnnouncement = async (req, res, next) => {
    let announcement_id = req.body.announcement_id;
    let announcement_type = req.body.announcement_type;
    let announcement_roles = req.body.announcement_roles;
    let announcement_start = req.body.announcement_start;
    let announcement_end = req.body.announcement_end;
    let announcement_message = req.body.announcement_message;
    let announcement_subject = req.body.announcement_subject;
    let data = [announcement_type,announcement_roles,announcement_start,announcement_end,announcement_message,announcement_subject, announcement_id]
    try {
        let results = await announcementService.updateAnnouncement(data);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log('Create Announcement', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};

exports.deleteAnnouncement = async (req, res, next) => {
    let announcement_id = req.query.announcement_id;
    try {
        let results = await announcementService.deleteAnnouncement(announcement_id);
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log('Create Announcement', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        return res.status(500).json({
            message: message
        });
    }

};