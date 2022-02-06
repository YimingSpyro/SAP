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

module.exports.getMCList = async (req, res) => {
    try {
        let acad_sem = decodeURIComponent(req.params.acad_sem)
        let results = await downloadsService.getMCList(acad_sem)
        if (results.errno) {
            throw "Database Error. SQL Error Code: " + results.errno + results.code;
        } else {
            return res.status(200).json(results);
        };
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};

module.exports.getSummaryByModule = async (req, res) => {
    try {
        let acad_sem = decodeURIComponent(req.params.acad_sem)
        let results = await downloadsService.getSummaryByModule(acad_sem)
        if (results.errno) {
            throw "Database Error. SQL Error Code: " + results.errno + results.code;
        } else {
            return res.status(200).json(results);
        };
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};

module.exports.getSummaryByStaff = async (req, res) => {
    try {
        let acad_sem = decodeURIComponent(req.params.acad_sem)
        let results = await downloadsService.getSummaryByStaff(acad_sem)
        if (results.errno) {
            throw "Database Error. SQL Error Code: " + results.errno + results.code;
        } else {
            return res.status(200).json(results);
        };
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};

module.exports.getTotalHoursByStaff = async (req, res) => {
    try {
        let acad_sem = decodeURIComponent(req.params.acad_sem)
        let results = await downloadsService.getTotalHoursByStaff(acad_sem)
        if (results.errno) {
            throw "Database Error. SQL Error Code: " + results.errno + results.code;
        } else {
            return res.status(200).json(results);
        };
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};

module.exports.getWorkloadSummaryByModule = async (req, res) => {
    try {
        console.log("enetering getWorkloadSummaryByModule")
        let acad_sem = decodeURIComponent(req.query.acad_sem)
        let results = await downloadsService.getWorkloadSummaryByModule(acad_sem)
        if (results.errno) {
            throw "Database Error. SQL Error Code: " + results.errno + results.code;
        } else {
            return res.status(200).json(results);
        };
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};

module.exports.getExaminerReports = async (req, res) => {
    try {
        console.log("getExaminerReports")
        let acad_sem = decodeURIComponent(req.query.acad_sem)
        let results = await downloadsService.getExaminerReports(acad_sem)
        if (results.errno) {
            throw "Database Error. SQL Error Code: " + results.errno + results.code;
        } else {
            return res.status(200).json(results);
        };
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};