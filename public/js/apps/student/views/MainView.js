define(function(require) {

	var Backbone = require('Backbone');
	var MeetingsView = require('./subviews/MeetingsView');

	var MainView = Backbone.View.extend({
		
		initialize: function() {
			this.subviews = [];
		},
		render: function() {

			var contactsView = new MeetingsView({
				collection: this.collection
			});
			this.$el.append(contactsView.render().el);
			this.subviews.push(contactsView);
			return this;
		}
	});

	return MainView;
});