var ObjectId = require('mongoose').Types.ObjectId;

const verifyObjectId = (req,res,next) => {
    return ObjectId.isValid(req.params._id)
            ? next()
            : res.status(400).json({code: 1, message: "Please check parameters passed to route"});
};

module.exports = {
    verifyObjectId
};
