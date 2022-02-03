const workloadService = require('../services/workloadService')
exports.getWorkloadByMC = async (req, res, next) => {
    let staff_id = req.query.mod_coord
    try {
        let results = await workloadService.getWorkloadByMC(staff_id);
        console.log('Get Workload By MC');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log('Get All Modules', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }

};
exports.createWorkload = async (req, res, next) => {
    //let staff_id = req.query.mod_coord
    console.log(req.body)
    return res.status(200).json(results);
    try {
        let results = await workloadService.getWorkloadByMC(staff_id);
        console.log('Get Workload By MC');
        if (results.errno) {
            throw 'Database SQL Error'
        }
        else {
            //console.log('Get All Modules', results);
            return res.status(200).json(results);
        }
    } catch (error) {
        let message = 'Server is unable to process your request. Error: ' + error;
        console.error('Server is unable to process the request', { 'Error': error })
        return res.status(500).json({
            message: message
        });
    }

};