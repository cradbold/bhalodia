var mongoose = require('mongoose');
exports.mongoose = mongoose;
var bcrypt = require('bcrypt');
var SALT_ROUNDS = 12;

// connection
var uriString = 'mongodb://localhost/database';
var mongoOptions = { db : { safe : true } };
mongoose.connect(uriString, mongoOptions, function(err, res) {
	if (err) {
		console.log('Error connecting to: ' + uriString + ': ' + err);
	} else {
		console.log('Successful Connecting to: ' + uriString);
	}
});

// schemas

// bcrypt
UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))
		return next();
	bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
		if (err)
			return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err)
				return next(err);
			user.password = hash;
			next();
		});
	});
});

// password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err)
			return cb(err);
		cb(null, isMatch);
	});
};

// models