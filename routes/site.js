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

				if (user.userType == 'teacher') {
					return res.redirect('/#teacher');
				}

				return res.redirect('/#student');
			});
		})(req, res, next);
	};

	var getDashboard = function(req, res) {

		res.render('dashboard', {
			user: req.user,
			message: req.session.messages
		});
	};

	var getLogout = function(req, res) {
		req.logout();
		res.redirect('/');
	};

	var postTeacherAvailability = function(req, res) {

		db.meeting.find({
			_id: req.params['meetingId']
		}).exec(function(err, data) {

			if (data && data[0] !== undefined) {

				var ateach = data[0].teachers || [];

				if (req.params['action'] == 'true') {

					ateach.push(req.user._id);

					db.meeting.update({
						_id: req.params['meetingId']
					}, {
						teachers: ateach
					}).exec(function(err, data) {});

				} else {

					if (ateach) {

						console.log("removeD!");

						for (var index in ateach) {

							if (!ateach[index]) {
								delete ateach[index];
							} else {
								if ((ateach[index]).toString() == (req.user._id).toString()) {

									console.log(ateach[index]);
									delete ateach[index];
									console.log(ateach[index]);
								}
							}
						}

						db.meeting.update({
							_id: req.params['meetingId']
						}, {
							teachers: ateach
						}).exec(function(err, data) {});
					}
				}
			}
			res.send('Done!');
		});


	};

	gc.post('/teacher/availability/:meetingId/:action', postTeacherAvailability);


	// gc.get('/index', getIndex);
	// gc.post('/index', postIndex);

	// @Todo need details about default page
	gc.get('/', getIndex);
	gc.post('/index', postIndex);

	gc.get('/dashboard', gc.auth.ensureAuthenticated, getDashboard);
	gc.get('/logout', getLogout);

	// gc.get('*', getIndex);

	// @todo need clarify about it
	// gc.get('/', getContact);
	// gc.post('/', postContact);
};