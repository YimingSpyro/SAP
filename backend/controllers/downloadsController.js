const excel = require('exceljs');
const downloadsService = require('../services/downloadsService')

//download exceljs generated reports
module.exports.getAssignmentReport = async (req, res) => {
    try {
        let acad_sem = decodeURIComponent(req.params.acad_sem)
        let results = await downloadsService.getAssignmentReport(acad_sem)
        if (results.errno) {
            throw "Database Error. SQL Error Code: " + results.errno + results.code;
        } else {
            return res.status(200).json(results);
        };
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};