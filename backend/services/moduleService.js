const config = require('../config/config');
const pool = require('../config/database')

module.exports.getEveryModule = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tas.module ORDER BY fk_semester_code, mod_stage LIMIT 10;', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    }).catch((error) => {
        console.error(error);
        return error
    })
};