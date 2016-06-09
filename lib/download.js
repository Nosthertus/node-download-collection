var utils     = require("utils-pkg"),
	request   = require("request"),
	fs        = require("fs"),
	path      = require("path"),
	directory = require("./dir.js");

module.exports._URL = "http://example.com";

module.exports._parseOpts = function(opts){
	return {
		url: this._URL,
		count: opts.count || 100,
		extension: opts.extension || null,
		directory: opts.directory || null
	};
}

module.exports.collection = function(URL, opts){
	var self = this;

	if(URL)
		self._URL = URL;

	opts = this._parseOpts(opts);

	var collection = this.createCollection(opts);

	utils.each(collection, function(index, obj, next){
		console.log("Downloading:", obj.url + " > " + obj.file);
		
		request(obj.url).pipe(fs.createWriteStream(obj.file)
			.on("close", function(){
				next();
			})
			.on("error", function(err){
				console.error(new Error(err));
			})
		);
	})
};

module.exports.createCollection = function(opts){
	var col = [];

	directory.create(opts.directory);
	
	if(!opts.count){
		console.error(new Error("count in options is undefined"));
		return;
	}

	for (var i = 0; i < opts.count; i++){
		var ext = opts.extension ? '.' + opts.extension : '';

		col.push({
			url: opts.url,
			file: path.join(opts.directory, i + ext)
		});
	}

	return col;
}