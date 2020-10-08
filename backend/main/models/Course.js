const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code : { type: String, trim: true, uppercase: true, unique: true, required: true},
    name : { type: String, trim: true, required: true}
    },
    { timestamps: 
        { createdAt: 'created_at' }
    }
);

courseSchema.statics.checkIfCourseExists = function (courseCode, cb) {
    return this.find({ 
        code : courseCode
    }, cb);
}

module.exports = mongoose.model("Courses", courseSchema);