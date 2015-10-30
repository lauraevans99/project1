// requirements
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var db = require("./index.js");

// build kid schema
var kidSchema = new Schema({
	name: String,
	progress: String
});

kidSchema.statics.createKid = function (name, progress, callback) {
	var kid = this;
	kid.create({
		name: name,
		progress: progress
	});
};

// create kid model
var Kid = mongoose.model("kid", kidSchema);

// export kid model
module.exports = Kid;