//this is a security function in the works by Zhi Lin
//this file aims to provide the middleware API for verifying token validty
//this file will check the user role, and validate the token against entries in the database

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const userID = req.headers.user
    const role = req.headers.role
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: 'Unauthorized access' });
      return;
    }
    const token = authHeader.replace("Bearer ", "");
    var options = {
      algorithms: ["HS256"]
    };
    jwt.verify(token, JWT_SECRET, options, function (error, decodedToken) {
      if (error) { //if the token isnt valid/doesnt match
        res.status(401).json({ message: 'Unauthorized access' });
        return;
      } else if (decodedToken.role != role || decodedToken.id != userID) {
        //if someone is trying to change the role
        res.status(401).json({ message: 'Unauthorized access' });
        return;
      };
      next()
    });
  
    authService.validateToken(token, function (error, results) {
      if (results == null) {
      }
      else if (results.length == 1) {
        res.status(401).json({ message: 'Unauthorized access' });
        return;
      }
      else if (error) {
        res.status(500).json({ message: 'Unauthorized access' });
        return;
      }
      next()
    });
  
  };