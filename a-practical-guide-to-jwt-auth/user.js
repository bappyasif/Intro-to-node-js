const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first: String,
    email: {type: String, unique: true},
    password: String,
    image: String
}, {timestamps: true})

UserSchema.pre("save", function(next) {
    let user = this;
    if(!user.isModified("password")) {return next()};
    bcrypt.hash(user.password, 11)
    .then(hashedPassword => {
        user.password = hashedPassword;
        next();
    })
}, function(err) {
    next(err)
})

UserSchema.methods.comparePassword = function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return next(err);
        next(null, isMatch)
    })
}

module.exports = mongoose.model("user", UserSchema)