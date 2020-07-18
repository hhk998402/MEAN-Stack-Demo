const jwt = require("jsonwebtoken");

const generateToken = async(user) => {
    return await jwt.sign({
            _id : user._id, 
            role : user.permissionLevel
        }, process.env.SECRET_TOKEN, {expiresIn : "1d"}
    );
};

const verifyToken = (req,res,next) => {
    const token = req.header("auth-token");
    if(!token)
        return res.status(401).json({code: 1, message: "Unauthorised user, please login first"});
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();

    } catch (error) {
        return res.status(400).json({code: 1, message: "Invalid/Expired Token, please login again"});
    }
};

module.exports = {
    generateToken,
    verifyToken
}