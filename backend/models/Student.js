const mongoose = require('mongoose'),
    validator = require('validator'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 15; //Default used by bcrypt is 10, we can specify another value here
var courseData = require("./Course.js");

const studentSchema = new mongoose.Schema({
        studentId : { type: String, uppercase: true, trim: true, required: true},
        name : { type: String, required: true},
        dob: { type: Date, required: true},
        email : { type: String,
            required : true,
            validate: { validator : validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            }          
        },
        password : { type: String, required : true},
        permissionLevel : {type : String, default : "STUDENT", enum : ["STUDENT"], uppercase: true},
        marks : [{
            courseCode : { type: String},
            score : { type: Number,
                min: [0, "Mark obtained can't be lesser than 0"], 
                max: [100, "Mark obtained can't be more than 100"]
            }
        }]
    },
    { timestamps: 
        { createdAt: 'created_at' }
    }
);

//Every student must have a unique combination of studentId and email
studentSchema.index({ studentId: 1, email: 1 }, { unique: true});

//Update student marks
studentSchema.statics.updateMarks = function (_id, marks) {
    console.log("Entered update marks function");
    return this.findOneAndUpdate({_id : _id}, {$set: {marks : marks}}, {
        new: true,
        runValidators: true
    });
}
//Update student profile
studentSchema.statics.updateStudentProfile = function (_id, name, dob) {
    console.log("Entered update student profile function");
    console.log(name);
    return this.findOneAndUpdate({_id : _id}, 
        {$set: {
            name : name, 
            dob : dob         
        }}, {
        new: true,
        runValidators: true
    });
}

//Method to check if password is correct or not
studentSchema.methods.comparePassword = function(candidatePassword) {
    return(bcrypt.compare(candidatePassword, this.password));
};

studentSchema.pre('save', function(next) {
    var self = this;
    console.log("DATA: " + self);
    // only hash the password if it has been modified (or is new)
    if (!self.isModified('password')) {
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(self.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            self.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("Student", studentSchema);