define(function(require) {

	var Backbone = require('Backbone');

	var LoginHeaderView = Backbone.View.extend({
		tagName: 'div',
		template: require('hbs!./loginHeaderView'),
		initialize: function() {},
		render: function(data) {
			this.$el.html(this.template());
			return this;
		}
	});

	return LoginHeaderView;
});