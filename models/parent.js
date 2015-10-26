// requirements 
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var db = require("./index.js");

// build parent schema
var parentSchema = new Schema({
	username: String,
	passwordDigest: String,
	name: String,
	numKids: Array,
	email: String
});

// create a parent with a secure password
parentSchema.statics.createSecure = function (username, password, email, callback) {
	var parent = this;
	// console.log("this is the parent object in create secure function: ", parent);

	bcrypt.genSalt(10, function (err, salt) {
    	bcrypt.hash(password, salt, function (err, hash) {
        	parent.create({
        		username: username,
        		passwordDigest: hash,
        		email: email
        	}, callback);
    	});
	});
};


// authenticate a parent

// create parent model
var Parent = mongoose.model("parent", parentSchema);

// export parent
module.exports = Parent;