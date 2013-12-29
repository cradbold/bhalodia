define(function(require) {

	var MeetingCollection = require('./collections/MeetingCollection');
	var MainView = require('./views/MainView');
	var LoggedHeader = require('../partials/loggedHeader');

	return {
		run: function(viewManager) {
			var meetingCollection = new MeetingCollection();
			meetingCollection.fetch({
				success: function(meetingCollection) {

					// console.log(meetingCollection.toJSON());
					// return;

					var view = new MainView({
						collection: meetingCollection
					});

					viewManager.show(view);

					// --

					var loggedHeaderView = new LoggedHeader({});
					viewManager.showHeader(loggedHeaderView);
				}
			});
		}
	};
});