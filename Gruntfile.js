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
					tasks: ['develop']
				},
				css: {
					files: ['public/css/*.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-develop');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['develop', 'watch']);


	// -- 
	// Custom Task

	grunt.registerTask('dbseed', 'seed the database', function() {
		//		grunt.task.run('dbdrop');
		grunt.task.run('adduser:conrad:cradbold@gmail.com:warmbold');
		grunt.task.run('adduser:jayesh:jayeshbhalodia@ymail.com:jayesh001');
	});

	grunt.registerTask('adduser', 'add a user to the database', function(username, email, password) {

		var user = new db.UserModel({
			username: username,
			email: email,
			password: password
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