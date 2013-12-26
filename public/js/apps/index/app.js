define(function(require) {

	var IndexView = require('./views/IndexView');
	var LoginHeader = require('../partials/loginHeader');

	return {
		run: function(viewManager) {
			var view = new IndexView({});
			viewManager.show(view);

			// --

			var loginHeaderView = new LoginHeader({});
			viewManager.showHeader(loginHeaderView);
		}
	};
});