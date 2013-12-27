define(function(require) {

	var Backbone = require('Backbone');
	var EmailView = Backbone.View.extend({
		tagName: 'div',
		template: require('hbs!./../../templates/MeetingView'),
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return EmailView;
});