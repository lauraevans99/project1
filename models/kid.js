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

// create kid model
var Kid = mongoose.model("Kid", kidSchema);

// export kid model
module.exports = Kid;