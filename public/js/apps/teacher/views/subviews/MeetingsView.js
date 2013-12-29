define(function(require) {

	var Backbone = require('Backbone');
	var MeetingView = require('./MeetingView');
	var $ = require('jQuery');
	var bootstrapSwitch = require('bootstrapSwitch');

	var InboxView = Backbone.View.extend({
		template: require('hbs!./../../templates/MeetingsView'),

		initialize: function() {
			this.subviews = [];
		},

		render: function() {
			this.$el.html(this.template());

			var mails = this.$('.tasks');
			this.collection.forEach(function(mail) {
				var view = new MeetingView({
					model: mail
				});
				mails.append(view.render().el);
				this.subviews.push(view);
			}, this);

			return this;
		}
	});

	return InboxView;
});