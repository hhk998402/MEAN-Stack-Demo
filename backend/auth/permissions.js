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
                if(level.condition !== null && level.condition !== undefined){
                    let isOwn = level.condition(req.user._id, req.params._id);
                    if(isOwn) return next();
                } else{
                    const user = await level.model.findOne({
                        _id : req.user._id,
                        'permission.hashRoleToken' : req.user.roleToken
                    });
                    if(user !== null && user !== undefined) return next();
                }
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