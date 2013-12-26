define(function(require) {
	var Backbone = require('Backbone');

	var EmailView = Backbone.View.extend({
		tagName: 'tr',
		template: require('hbs!./../../templates/MeetingView'),
		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
			this.$(".bt-switch").bootstrapSwitch();
			var self = this;
			this.$(".bt-switch").on('switch-change', function(e, data) {

				Backbone.ajax({
					method: 'POST',
					url: '/teacher/availability/' + self.model.get('_id') + '/' + data.value,
					success: function(err, response) {
						// @todo
						// make sure its successfully done!
					}
				});

			});
			return this;
		}
	});

	return EmailView;
});