var db = require('./db/database');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		develop: {
			server: {
				file: 'app/server.js'
			}
		},
		watch: {
			scripts: {
				files: [
					'app/server.js',
					'routes/*.js',
					'db/*.js'
				],
				options: {
					livereload: true,
					tasks: ['develop', 'requirejs']
				}
			},
			css: {
				files: ['public/css/*.css']
			}
		},
		requirejs: {
			js: {
				options: {
					baseUrl: "public/js",
					mainConfigFile: "public/js/main.js",
					name: 'main',
					out: "public/build/main.js"
				}
			}
			// css: {
			// 	options: {
			// 		baseUrl: 'public/css',
			// 		cssIn: "public/css/main.css",
			// 		out: "public/build/main.css",
			// 		cssImportIgnore: null,
			// 		optimizeCss: 'default'
			// 	}
			// }
		},
	});

	// load tasks
	grunt.loadNpmTasks('grunt-develop');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.registerTask('default', ['develop', 'requirejs', 'watch']);

	// -- 
	// Custom Task

	grunt.registerTask('dbseed', 'seed the database', function() {
		grunt.task.run('adduser:conrad:cradbold@gmail.com:warmbold:teacher');
		grunt.task.run('adduser:jayesh:jayeshbhalodia@ymail.com:jayesh001:student');

		grunt.task.run('addmeetings:MeetingATeam:LoremIpsum:"2014-01-01');
		grunt.task.run('addmeetings:MeetingBTeam:LoremIpsum:"2014-01-02');
		grunt.task.run('addmeetings:MeetingCTeam:LoremIpsum:"2014-01-03');
		grunt.task.run('addmeetings:MeetingDTeam:LoremIpsum:"2014-01-04');
	});

	grunt.registerTask('adduser', 'add a user to the database', function(username, email, password, userType) {

		var user = new db.UserModel({
			username: username,
			email: email,
			password: password,
			userType: userType
		});

		// save call is async, put grunt into async mode to work
		var done = this.async();

		user.save(function(err) {
			if (err) {
				console.log('Error: ' + err);
				done(false);
			} else {
				console.log('saved user: ' + user.username);
				done();
			}
		});
	});

	grunt.registerTask('addmeetings', 'add a meeting to the database', function(subject, description, datetime) {

		var meetingForm = new db.meeting({
			subject: subject,
			description: description,
			datetime: datetime
		});

		// save call is async, put grunt into async mode to work
		var done = this.async();

		meetingForm.save(function(err) {
			if (err) {
				console.log('Error: ' + err);
				done(false);
			} else {
				console.log('saved Meeting data');
				done();
			}
		});
	});

	grunt.registerTask('removeUser', 'Remove user from DB', function() {

		var done = this.async();

		db.UserModel.remove({}, function(err) {
			if (err) {
				console.log('Error: ' + err);
				done(false);
			} else {
				console.log('Removed Users');
				done();
			}
		});
	});

	grunt.registerTask('dbdrop', 'drop the database', function() {

		// async mode
		var done = this.async();

		db.mongoose.connection.on('open', function() {
			db.mongoose.connection.db.dropDatabase(function(err) {
				if (err) {
					console.log('Error: ' + err);
					done(false);
				} else {
					console.log('Successfully dropped db');
					db.mongoose.connection.close();
					done();
				}
			});
		});
	});
};