module.exports = function(gc) {

	var getIndex = function(req, res) {
		res.render('index', {
			user: req.user,
			message: req.session.messages
		});
	};

	var postIndex = function(req, res, next) {

		gc.passport.authenticate('local', function(err, user, info) {

			console.log(user);

			if (err) {
				return next(err);
			}
			if (!user) {
				req.session.messages = [info.message];

				console.log(info);

				return res.redirect('/index');
			}
			req.login(user, function(err) {

				console.log(err);


				if (err) {
					return next(err);
				}
				return res.redirect('/dashboard');
			});
		})(req, res, next);
	};

	var getDashboard = function(req, res) {		

		console.log(req.user.userType);

		res.render('dashboard', {
			user: req.user,
			message: req.session.messages
		});
	};

	var getLogout = function(req, res) {
		req.logout();
		res.redirect('/');
	};

	gc.get('/index', getIndex);
	gc.post('/index', postIndex);

	// @Todo need details about default page
	gc.get('/', getIndex);
	gc.post('/', postIndex);

	gc.get('/dashboard', gc.auth.ensureAuthenticated, getDashboard);
	gc.get('/logout', getLogout);

	// @todo need clarify about it
	// gc.get('/', getContact);
	// gc.post('/', postContact);
};