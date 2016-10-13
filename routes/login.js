//var express = require('express');
var Sequelize = require('sequelize');
var passwordhash = require('password-hash');
// var session = require('express-session');


//var app = express();


var template_root = __dirname + '/../templates'

// app.use(express.static(__dirname + '/../templates'));

/*app.use(session({
	secret: 'This is a secret that nobody knows!',
	resave: false,
	saveUninitialized: true,
	cookie: { }
}))*/

var sequelize = require('../config/user').Sequelize;
var Users = require('../config/user').Users;

module.exports = function(app, express, passport) {
	var router = express.Router();
	router.get('/', function(req, res) {
		if (req.session.username)
			res.send('Hi, ' + req.session.username);
		else {
			res.sendFile('/login.html',{'root': template_root});
		}
	});

	/* New user login option. */
	router.post('/', function(req, res) {
		/*if (req.session.username) {
			res.send("Already logged in!")
		} else {
			req.assert('username', 'Username cannot be null').notEmpty();
			req.assert('password', 'Password cannot be null').notEmpty();
			var errors = req.validationErrors()
			if (errors) {
				res.send({'status': "Failed", 'errors': errors});
			} else {
				sequelize.sync()	
				.then(function() {
					Users.findOne({ 
						where: { Username: req.body.username } 
					})
					.then(function(user) {
						if (user && passwordhash.verify(req.body.password, user.PasswordHash)) {
							req.session.username = user.Username
							res.send('Successfully logged in!');
						}
						else {
							res.send({'status': "Failed", 'errors': [{msg: 'Incorrect username or password'}] });
						}
					})
					.catch(function(err) {
						console.log(err);
					});
				});	
			}
		}*/
		if (req.user) {
			res.send("Already logged in!")
		} else {
			passport.authenticate('local-login', function(err, user, info) {
				if (!user) {
					res.send({'status': "Failed", 'errors': [{msg: info }]});
				} else {
					res.send(info)
				}
			})(req, res)
		}
	});	
	return router;
}

