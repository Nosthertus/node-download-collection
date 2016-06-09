var download = require("./lib/download.js");

download.collection("https://placeimg.com/640/480/people", {
	extension: "png",
	directory: "people"
});