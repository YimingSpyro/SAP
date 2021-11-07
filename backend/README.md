# Code Standard
This is the code standard page for all backend developers of the project. In this README, we will be demonstrating the syntax and structure to write APIs for the backend of the project.

Ideally, we will be using Promise based functions so that errors will be easier to catch overall. 
A general guideline to naming conventions in the system: 
newFunction : Functions are in camel case
variable_name : Variable names will be in snake case in all lowercase

1. Example of Writing a new Service (a service is a call made to the database for information) 
```//Description of the new function here
module.exports.functionName = (variable_name) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error Message Here', err);
                resolve(err);
            } else {
                connection.query(`SELECT user.user_id, fullname, email, user_password, role_name, user.role_id  
                FROM user INNER JOIN role ON user.role_id=role.role_id AND email=?`, [variable_name] ,(err, results) => { //please use only ? to prevent sql injection
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length == condition) {
                            console.log(results);
                            return resolve(results);
                        } else {
                            return resolve('Error Message');
                        }
                    }
                    connection.release();
                });
            }
        });
    }); //End of new Promise object creation
} //End of newFunction
```
