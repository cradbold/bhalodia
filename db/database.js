var mongoose = require('mongoose');
exports.mongoose = mongoose;

var bcrypt = require('bcrypt');
var SALT_ROUNDS = 12;

// connection
var uriString = 'mongodb://localhost/gc';
var mongoOptions = {
	db: {
		safe: true
	}
};
mongoose.connect(uriString, mongoOptions, function(err, res) {
	if (err) {
		console.log('Error connecting to: ' + uriString + ': ' + err);
	} else {
		console.log('Successful Connecting to: ' + uriString);
	}
});

// --
// User Schema

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	userType: {
		type: String,
		required: true
	}
});


// Event
userSchema.pre('save', function(next) {
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


// Method
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err)
			return cb(err);
		cb(null, isMatch);
	});
};

exports.UserModel = mongoose.model('User', userSchema);

// --

var meetingSchema = mongoose.Schema({
	subject: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	datetime: {
		type: Date,
		required: true
	},
	teachers: []
});

exports.meeting = mongoose.model('meeting', meetingSchema);