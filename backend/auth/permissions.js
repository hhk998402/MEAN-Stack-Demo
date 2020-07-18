const jwt = require("jsonwebtoken");
const { roles } = require("./roles.js");

// middleware for doing role-based permissions
const permit = (...allowedLevels) => {

    // return a middleware
    return async(req, res, next) => {
        try{
            for (level of allowedLevels) {
                console.log("LEVEL",level);
                console.log("USER", req.user);
                console.log(req.user._id);
                let isAuthorised = level.condition(req);
                if(isAuthorised) return next();
            }
            return res.status(403).json({code: 1, message: "Forbidden! You do not have access to this page"});
        } catch(error){
            return res.status(401).json({code:1, 
                message: "Error occurred while trying to check user permission level",
                error: error
            })
        }
    }
  }

module.exports = {
    permit
}