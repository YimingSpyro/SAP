const jwt = require('jsonwebtoken');
const config = require('../config/config');
const JWT_SECRET_KEY = 'tassystem';
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
    },checkJWT : (req, res, next) => {
        console.log("checking jwt");
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            console.log("no token");
          return res.sendStatus(403);
        }
        try {
          const data = jwt.verify(token, JWT_SECRET_KEY);
          req.staff_name = data.staff_name;
          req.staff_id = data.staff_id;
          req.role_name = data.role_name;
          return next();
        } catch(e) {
            console.log(e);
          return res.sendStatus(403);
        }
      }
}