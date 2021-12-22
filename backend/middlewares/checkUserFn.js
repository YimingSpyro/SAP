const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports={
    getClientUserId :(req, res, next) => {
        let message = 'Unauthorized access';
        console.log('http header - user ', req.headers['user']);
        req.body.userId = req.headers['user'];
        console.log('Inspect user id which is planted inside the request header : ', req.body.userId);
        if (req.body.userId != null) {
            next()
            return;
        } else {
            res.status(403).json({ message: message });
            return;
        }

    },checkAdmin : (req,res,next)=>{
        let message = 'Unauthorized access';
        var role = "user";
        var token = req.headers['authorization'].replace('Bearer ','').trim();
        jwt.verify(token,config.JWTKey,function(err,decoded){
            if(err){
                res.status(403).json({ message: message});
                return;
            }else{
                console.log(decoded);
                role = decoded.role;
                if(role==='admin'){
                    next()
                    return;
                } else {
                    res.status(403).json({ message: message });
                    return;
                }
            }
        })
    }
}