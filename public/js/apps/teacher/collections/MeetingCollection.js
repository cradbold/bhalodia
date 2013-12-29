define(function(require) {

	var Backbone = require('Backbone');

	return Backbone.Collection.extend({
		model: require('./../models/meeting'),
		url: '/api/v0.1/meeting'
	});
});