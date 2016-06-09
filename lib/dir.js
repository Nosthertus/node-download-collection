var flutils = require("flutils"),
	fs 		= require("fs");

module.exports.create = function(dir){
	if(!flutils.dirExists(dir)){
		fs.mkdirSync(dir);
	}
}