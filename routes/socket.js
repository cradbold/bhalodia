var siteObj = require('./site');

module.exports = function(gc, socket) {

	socket.on('teacherDashboardAction', function(data) {

		if (data.tokenID) {

			if (data.online) {

				gc.db.UserModel.findOne({
					_id: data.tokenID
				}, function(err, user) {

					if (err) {
						console.log(err);
					}

					if (user) {

						siteObj.liveTeachers.push({
							_id: user._id,
							firstName: user.firstName,
							lastName: user.lastName
						});

						socket.broadcast.emit('refreshLiveTeacher', {
							status: 'done'
						});
						console.log("Emit!!");
					}
				});

			} else {
				siteObj.removeTeacher(data.tokenID);
				socket.broadcast.emit('refreshLiveTeacher', {
					status: 'done'
				});
			}

		}
	});

	socket.on('getMeetingConfirm', function(data) {

		gc.db.UserModel.findOne({
			_id: data.tokenID
		}, function(err, user) {

			if (err) {
				console.log(err);
			}

			// --

			if (user) {

				socket.broadcast.emit('meetingConfirm', {
					_token: data.teacherID,
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName
				});
				console.log("getMeetingConfirm-Emit!!");
			}
		});
	});

	socket.on('teacherAcceptMeeting', function(data) {

		var meetingForm = new gc.db.meeting({
			attendees: {
				student: data._id,
				teacher: data._token,
			},
			timeStart: new Date()
		});

		meetingForm.save(function(err, dbRes) {
			if (err) {
				console.log(err);
			} else {

				console.log("DBRES", {
					_accessToken: dbRes._id,
					_t: data._token,
					_s: data._id
				});

				socket.broadcast.emit('startMeeting', {
					_accessToken: dbRes._id,
					_t: data._token,
					_s: data._id
				});

				socket.emit('startMeeting', {
					_accessToken: dbRes._id,
					_t: data._token,
					_s: data._id
				});

			}
		});
	});
};