// requirements
var express = require("express");
var app = express();
var ejs = require("ejs");
var mongoose = require("mongoose");
var db = require("./models/index");
var bcrypt = require("bcrypt");
var session = require('express-session');
var bodyParser = require("body-parser");
var teoria = require("teoria");
var cookieParser = require("cookie-parser");

// specify ejs for views
app.set("view engine", "ejs");

// save css and js to static folder
app.use("/static", express.static("./public"));

// tell express to use bodyParser module
app.use(bodyParser.urlencoded({extended: true}));

// cookie parser for sessions
app.use(cookieParser());

// set session options
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

// default action when user goes to the homepage
app.get("/", function (req, res) {
	res.render("index");
});

// action when user logs in or registers
app.post("/register", function (req, res) {
	db.Parent.findOne({username: req.body.registerUsername}, function(err, user) {
		//console.log(user);
		if (user===null) {
			db.Parent.createSecure(req.body.registerUsername, req.body.registerPassword, req.body.email, function(err, parentData) {
				if (err) {
					console.log("had trouble creating parent");
					res.send(err);
				} else {
					//res.json(parentData);
          req.session.userId = user._id;
					console.log("created parent " + req.session.userId);
          res.render('profile');
				}
			});
		} else {
			console.log("user exists");
			res.status(500).send({ error: 'Something blew up!' });
		}
	});
});

//logins route
app.post("/login", function (req, res) {
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
    			req.session.userId = user._id;
    			// console.log(req.session.userId);
    			res.redirect('profile');
    			//req.session.userId = newUser._id;

    		} else if (result === false) {
    			var errMessage = res.status(500).send({ error: 'Something blew up!' });
    			// console.log(errMessage);
    			console.log("user password is wrong");
    			//res.render('index', { errorResult: "errorMsg"}); 
    		}
			});
		} else if (user===null) {
			res.status(500).send({ error: 'Something blew up!' });
			return console.log("user not found, please register");
		}

	});
});

app.get('/profile', function (req, res) {

  db.Parent.findOne({_id: req.session.userId}, function (err, currentUser) {
    if (currentUser) {
    	var username = currentUser.username;
    	res.render('profile', {user: username});
    } else {
    	res.render('index.ejs');
    }
  });
});

app.get('/memoryGame', function (req, res) {
  // find the user currently logged in
  // console.log("request session data is: " + req.session.userId);
  // db.Parent.findOne({_id: req.session.userId}, function (err, currentUser) {
  //   console.log("current user: " + currentUser);
  if(req.session.userId) {
    res.render('memoryGame.ejs');
  } else {
    res.render('index.ejs');
  }
  // });
});

app.get('/mainGame', function (req, res) {
  if(req.session.userId) {
    res.render('mainGame.ejs'); 
  } else {
    res.render('index.ejs');
  }
});

app.get("/earGame", function (req, res) {
  if(req.session.userId) {
    res.render("earGame.ejs"); 
  } else {
    res.render('index.ejs');
  }
});

app.get("/songGame", function (req, res) {
  if(req.session.userId) {
    res.render("songGame.ejs"); 
  } else {
    res.render('index.ejs');
  }
});

app.get('/logout', function (req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  // destroy the user's session to log them out                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  // will be re-created next request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
     res.render('index.ejs');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  }); 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
});   

app.post('/addChild', function (req, res) {
  console.log("in the add child route " + req.name);
  db.Kid.createKid({name: req.body.name}, {progress: "initialized"}, function (err, result) {
    if (err) {
      res.send(500);
    } else if (result) {
      console.log(req.name);
    }
  });
});

// connect to server

app.listen(process.env.PORT || 4050, function(){
	console.log("Listening");
});