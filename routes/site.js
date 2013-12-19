module.exports = function(gc) {
	
	var getIndex = function(req, res) { 
		res.render('index', {
			user: req.user,
			message : req.session.messages
		});
	};
	
	var postIndex = function(req, res, next) {
		gc.passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				req.session.messages = [ info.message ];
				return res.redirect('/index');
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/dashboard');
			});
		})(req, res, next);
	};
	
	gc.get('/', getContact);
	gc.post('/', postContact);
	gc.get('/index', getIndex);
	gc.post('/index', postIndex);
	gc.get('/dashboard', gc.auth.ensureAuthenticated, getDashboard);
	gc.get('/logout', getLogout);
};
