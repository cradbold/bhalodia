module.exports = function(gc) {

	var db = require(__dirname + '/../db/database');

	var getIndex = function(req, res) {
		res.render('master', {
			title: 'GC',
			user: req.user,
			message: req.session.messages
		});
	};

	var postIndex = function(req, res, next) {

		gc.passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				req.session.messages = [info.message];
				return res.redirect('/');
			}
			req.login(user, function(err) {

				if (err) {
					console.log(err);
					return next(err);
				}
				return res.redirect('/dashboard');
			});
		})(req, res, next);
	};

	var getDashboard = function(req, res) {

		var viewNm = 'student_dashboard';
		if (req.user.teacher) {
			viewNm = 'teacher_dashboard';
		}

		// --

		res.render(viewNm, {
			user: req.user,
			session: req.session,
			message: req.session.messages
		});
	};

	var postTeacherAvailability = function(req, res) {

		if (req.user.teacher) {
			if (req.params['action'] == 'true') {
				req.session.teacherAvailability = true;
			} else {
				req.session.teacherAvailability = false;
			}
			res.send(202, {
				success: true
			});
		} else {
			res.status(404, 'Page not founded!');
		}
	};

	var getMeeting = function(req, res) {

		res.render('meeting', {
			user: req.user,
			session: req.session,
			message: req.session.messages
		});
	};

	var getLogout = function(req, res) {
		req.logout();
		res.redirect('/');
	};


	gc.get('/', getIndex);
	gc.post('/index', postIndex);
	gc.get('/dashboard', gc.auth.ensureAuthenticated, getDashboard);
	gc.get('/meeting/:id', gc.auth.ensureAuthenticated, getMeeting);
	gc.post('/teacher/availability/:action', postTeacherAvailability);
	gc.get('/logout', getLogout);
};

// --
// for manage teacher availibility

var liveTeachers = [];
module.exports.liveTeachers = liveTeachers;
module.exports.getLiveTeachers = function() {
	return liveTeachers;
}
module.exports.removeTeacher = function(_id) {
	if (liveTeachers) {
		for (var row in liveTeachers) {
			if (liveTeachers[row]._id == _id) {
				liveTeachers.splice(row, 1);
			}
		}
	}
}