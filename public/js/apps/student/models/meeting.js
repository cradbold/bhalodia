define(function(require) {
	var Backbone = require('Backbone');
	return Backbone.Model.extend({
		urlRoot: '/api/v0.1/student-meeting'
	});
});