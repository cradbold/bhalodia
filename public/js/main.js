require.config({
	hbs: {
		templateExtension: 'html',
		disableI18n: true,
		disableHelpers: true
	},

	shim: {
		'jQuery': {
			exports: '$'
		},

		'Underscore': {
			exports: '_'
		},

		'Backbone': {
			deps: ['Underscore', 'jQuery'],
			exports: 'Backbone'
		},

		'Handlebars': {
			deps: ['handlebars'],
			exports: 'Handlebars'
		},

		'ApplicationRouter': {
			deps: ['jQuery', 'Underscore', 'Backbone']
		}

		// 'bootstrapSwitch': {
		// 	deps: ['jQuery']
		// }
	},

	paths: {
		jQuery: './../components/jquery/jquery',
		teacherDashbaord: './teacher_dashboard',
		Underscore: './../components/underscore/underscore',
		underscore: './../components/require-handlebars-plugin/hbs/underscore',
		Backbone: './../components/backbone/backbone',
		handlebars: './../components/require-handlebars-plugin/Handlebars',
		hbs: './../components/require-handlebars-plugin/hbs',
		i18nprecompile: './../components/require-handlebars-plugin/hbs/i18nprecompile',
		json2: './../components/require-handlebars-plugin/hbs/json2',
		bootstrapSwitch: './../components/bootstrap-switch/build/js/bootstrap-switch.min'
	}
});

require(['jQuery', 'bootstrapSwitch', 'core/router', 'core/client', 'Backbone', , 'teacherDashbaord'], function($, bs, Router, client, Backbone) {

	var app = {
		root: '/'
	};

	window.Router = new Router();
	client.setup(window, app);

	Backbone.history.start({
		pushState: true
	});
});