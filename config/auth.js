var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../db/database');

// @todo need clarify
// var db = require('../db/gradecaddy');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db.UserModel.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(function(username, password, done) {
	db.UserModel.findOne({
		username : username
	}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message : 'Unknown user ' + username
			});
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err)
				return done(err);
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {
					message : 'Invalid password'
				});
			}
		});
	});
}));

// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};

// Check for admin middleware, this is unrelated to passport.js
// You can delete this if you use different method to check for admins or don't need admins
exports.ensureAdmin = function ensureAdmin(req, res, next) {
	if(req.user && req.user.admin === true)
        return next();
    else
        res.send(403);
};