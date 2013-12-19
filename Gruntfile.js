var db = require('./db/database');

module.exports = function(grunt) {

	grunt.registerTask('dbseed', 'seed the database', function() {
//		grunt.task.run('dbdrop');
		grunt.task.run('adduser:conrad:warmbold');
		grunt.task.run('adduser:jordan:ginest');
		grunt.task.run('adduser:kyle:pond');
	});

	grunt.registerTask('adduser', 'add a user to the database', function(firstname, lastname) {

		var user = new db.UserModel({
			fname: firstname,
			lname: lastname
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