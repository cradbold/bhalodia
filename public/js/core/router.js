define(function(require) {
	var Backbone = require('Backbone');
	var viewManager = require('./viewManager');

	var Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'teacher': 'teacher',
			'student': 'student',
			// 'inbox': 'inbox',
			// 'inbox/compose': 'inboxCompose',
			// 'contacts': 'contacts',
			// 'tasks': 'tasks'
		},

		index: function() {
			require('./../apps/index/app').run(viewManager);
		},

		teacher: function() {
			require('./../apps/teacher/app').run(viewManager);
		},

		student: function() {
			require('./../apps/student/app').run(viewManager);
		},

		// inbox: function() {
		// 	require('./../apps/inbox/app').run(viewManager);
		// },

		// inboxCompose: function() {
		// 	require('./../apps/inbox/subapps/compose/app').run(viewManager);
		// },

		// contacts: function() {
		// 	require('./../apps/contacts/app').run(viewManager);
		// },

		// tasks: function() {
		// 	require('./../apps/tasks/app').run(viewManager);
		// }
	});

	return Router;
});