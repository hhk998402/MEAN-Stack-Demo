const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    const token = req.header("auth-token");
    if(!token)
        return res.status(401).json({code: 1, message: "Access Denied"});
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
        
    } catch (error) {
        return res.status(400).json({code: 1, message: "Invalid Token"});
    }
}