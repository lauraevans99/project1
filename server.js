// requirements
var express = require("express");
var app = express();
var ejs = require("ejs");
var mongoose = require("mongoose");
var db = require("./models/index");
var bcrypt = require("bcrypt");
var session = require('express-session');
var bodyParser = require("body-parser");

// specify ejs for views
app.set("view engine", "ejs");

// save css and js to static folder
app.use("/static", express.static("./public"));

// tell express to use bodyParser module
app.use(bodyParser.urlencoded({extended: true}));

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

// default action when user goes to the homepage
app.get("/", function (req, res) {
	res.render("index");
});

app.get("/confirm", function (req, res) {
	res.render("confirm");
});

// action when user logs in or registers
app.post("/register", function (req, res) {
		//login
		//username
		//password
		//remember("on")

	db.Parent.findOne({username: req.body.registerUsername}, function(err, user) {
		console.log(user);
		if (user===null) {
			db.Parent.createSecure(req.body.registerUsername, req.body.registerPassword, req.body.email, function(err, parentData) {
				if (err) {
					console.log("had trouble creating parent");
				} else {
					//res.json(parentData);
					req.session.userId = parentData._id;
					console.log("created parent " + req.session.userId);
				}
			});

		} else {
			console.log("user exists");
		}

	});

	//res.send(req.body);
});

//logins route
app.post("/login", function (req, res) {
		//login
		//username
		//password
		//remember("on")
		console.log(req.body.username);
		var registerPassword = req.body.password;


	db.Parent.findOne({username: req.body.username}, function(err, user) {
		if (user) {
			// Load hash from your password DB.
			bcrypt.compare(registerPassword, user.passwordDigest, function(err, result) {
    		// res == true
    		console.log("compared passwords. this is the response: " + result);
    		if (err) {
    			console.log("ERROR: was not able to authenticate user: " + err);
    		} else if (result) {
    			console.log("user authenticated: ", user.username);

    			//req.session.userId = newUser._id;
  

    		} else if (result===false) {
    			res.render("index", { errorResult: "errorMsg"});
    			console.log("user password is wrong");
    			//res.render('index', { errorResult: "errorMsg"}); 
    		}
			});


			// bcrypt.genSalt(10, function (err, salt) {
   //  			bcrypt.hash(password, salt, function (err, hash) {
   //      			if (err) {
   //      				console.log("error hashing login password");
   //      			} else {
   //      				//compare password entered to database
   //      				console.log("this is the user data found at login: " + user + " and hash: " + hash);
   //      			}
   //  			});
			// });

			// db.Parent.createSecure(req.body.username, req.body.password, req.body.email, function(err, parentData) {
			// 	if (err) {
			// 		console.log("had trouble creating parent");
			// 	} else {
			// 		//res.json(parentData);
			// 		console.log("created parent");
			// 	}
			// });



		} else if (user===null) {
			return console.log("user not found, please register");
		}

	});

	//res.send(req.body);
	//res.render('index');
});

app.get('/profile', function (req, res) {
  // find the user currently logged in
  console.log("request session data is: " + req.session.userId);
  db.Parent.findOne({_id: req.session.userId}, function (err, currentUser) {
    console.log("current user: " + currentUser);
    res.render('profile.ejs', {user: currentUser});
  });
});

// connect to server

app.listen(process.env.PORT || 4050, function(){
	console.log("Listening");
});