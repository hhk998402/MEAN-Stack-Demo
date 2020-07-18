const mongoose = require('mongoose'),
    validator = require('validator')
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 15; //Default used by bcrypt is 10, we can specify another value here

const adminSchema = new mongoose.Schema({
        name : { type: String, trim: true, required: true},
        email : { type: String,
            required : true,
            validate: { validator : validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            },
            unique : true     
        },
        password : { type: String, required : true},
        permissionLevel: {type : String, default : "ADMIN", enum : ["ADMIN"], uppercase: true}
    },
    { timestamps: 
        { createdAt: 'created_at' }
    }
);

//Method to check if password is correct or not
adminSchema.methods.comparePassword = function(candidatePassword) {
    return(bcrypt.compare(candidatePassword, this.password));
};

adminSchema.pre('save', function(next) {
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

module.exports = mongoose.model("Admins", adminSchema);