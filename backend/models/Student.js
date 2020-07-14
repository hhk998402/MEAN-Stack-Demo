const mongoose = require('mongoose');
var courseData = require("./Course.js");
const studentData = require('./Student')

const studentSchema = new mongoose.Schema({
        studentId : { type: String, uppercase: true, trim: true, unique: true, required: true},
        name : { type: String, required: true},
        dob: { type: Date, required: true},
        marks : [{
            courseCode : { type: String},
            score : { type: Number, min: 0, max: 100}
        }],
    },
    { timestamps: 
        { createdAt: 'created_at' }
    });

studentSchema.statics.updateMarks = function (studentId, marks) {
    console.log("Entered update marks function");
    return this.findOneAndUpdate({studentId : studentId}, {$set: {marks : marks}}, {
        new: true,
        runValidators: true
    });
}

studentSchema.statics.updateStudentProfile = function (studentId, name, dob) {
    console.log("Entered update student profile function");
    console.log(name);
    return this.findOneAndUpdate({studentId : studentId}, 
        {$set: {
            name : name, 
            dob : dob
        }}, {
        new: true,
        runValidators: true
    });
}

// studentSchema.pre('save', function(next){
//     var self = this;
//     console.log("HERE");
//     //Checking if all courseNames are present in courseSchema
//     for (course of self.marks) {
//         console.log(course.courseCode);
//     }
//     next(new Error("hekl"));
// });

module.exports = mongoose.model("Student", studentSchema);