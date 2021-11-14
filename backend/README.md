# Code Standard
This is the code standard page for all backend developers of the project. In this README, we will be demonstrating the syntax and structure to write APIs for the backend of the project.

Ideally, we will be using Promise based functions so that errors will be easier to catch overall. 

System Hierachy is as follows: app.js > middlewares > controller > services 

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
                //please use only ? when declaring values to be inserted to prevent sql injection
                connection.query(`SELECT user.user_id FROM user INNER JOIN role ON user.role_id=role.role_id AND email=?`, [variable_name] ,(err, results) => { 
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

2. Example of writing a controller (a controller is to prepare the data which was received/sent from the request)
``` 
const importedServices = require('../services/newService'); // to be declared at the very start of the file once

//Description of the new function here
exports.processNewFunction = async(req, res, next) => {
    let variable_name = req.params.variable
    try {
        let results = await importedServices.getOneUserData(variable_name);
        console.log('Briefly Describe Your Function here', results);
        if (results) {
            var sample_result = {
                'data': results[0],
            }
            return res.status(200).json(jsonResult);
        }
    } catch (error) {
        let message = 'Server is unable to process your request.';
        user.error('Server is unable to process the request', {'Error':error})
        return res.status(500).json({
            message: message
        });
    }

}; //End of processNewFunction */
```

3. sample of middleware functions: these are functions that must be checked before proceeding

these functions can vary alot and have no specific fixed format. 
```
module.exports.checkClientFn = (req, res, next) => {
    // write the code for the function here

    if (condition) {
        next() //this will allow it proceed to the next function in the api
        return; 
    } else {
        res.status(403).json({ message: 'Write Intended Message Here' }); // this will stop the execution of the rest of the api
        return;
    }

} //End of checkClientFn
```

4. Sample of api function: these will call upon the backend to make requests with or without client params.

```
//these constants are declared at the start of the document for access to the controller functions
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');


//Describe your Function here
//Match URL's with controllers
exports.appRoute = router => {
    //the format for this is as follows
    //router.post('api route', middlewareFunction, controllerFunction);
    router.post('/api/user/', checkUserFn.verifyToken, userController.processUpdateOneUser);
};
```
