define(function(require) {

	var Backbone = require('Backbone');

	var IndexView = Backbone.View.extend({
		tagName: 'div',
		template: require('hbs!./../templates/IndexView'),
		initialize: function() {},
		render: function(data) {
			this.$el.html(this.template());
			return this;
		}
	});

	return IndexView;
});