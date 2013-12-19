module.exports = function(gc) {
	
	var api = "/api";
	var version = '/v0.1';
	var prefix = api + version;
		
	gc.get(api, function(req, res) {
	    res.send('GC API is up and running -- append a version...\n');
	});
	
	gc.get(prefix, function(req, res) {
	    res.send('GC ' + version + ' API is up and running...\n');
	});
	
};
