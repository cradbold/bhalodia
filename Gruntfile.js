var db = require('./db/database');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			dev: {
				options: {
					file: 'app/server.js',
					nodeArgs: ['--debug'],
					env: {
						PORT: '8181'
					}
				}
			}
		},
		// develop: {
		// 	server: {
		// 		file: 'app/server.js'
		// 	}
		// },
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
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.registerTask('default', ['nodemon', 'requirejs', 'watch']);

	// -- 
	// Custom Task

	grunt.registerTask('dbseed', 'seed the database', function() {
		grunt.task.run('adduser:Conrad:Warmbold:conrad:cradbold@gmail.com:warmbold:true:false');
		grunt.task.run('adduser:Conrad1:Warmbold1:conrad1:cradbold1@gmail.com:warmbold1:true:false');
		grunt.task.run('adduser:Jayesh:Bhalodia:jayesh:jayeshbhalodia@ymail.com:jayesh001:false:true');
		grunt.task.run('adduser:Jayesh1:Bhalodia1:jayesh1:jayeshbhalodia1@ymail.com:jayesh001:false:true');
	});

	grunt.registerTask('adduser', 'add a user to the database', function(firstName, lastName, username, email, password, isTeacher, isStudent) {

		String.prototype.bool = function() {
			return (/^true$/i).test(this);
		};

		var user = new db.UserModel({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password: password,
			teacher: isTeacher.bool(),
			student: isStudent.bool()
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