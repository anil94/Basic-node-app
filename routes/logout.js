var express = require('express');
var Sequelize = require('sequelize');
var passwordhash = require('password-hash');
// var session = require('express-session');

// var app = express();

// var router = express.Router();

/*app.use(session({
	secret: 'This is a secret that nobody knows!',
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));*/

var sequelize = require('../config/user').Sequelize;
var Users = require('../config/user').Users;

module.exports = function(app, express, passport) {
var router = express.Router();
/* Logout option. */
router.get('/', function(req, res) {
	if (req.session.username) {
		req.session.destroy()
		res.send('Successfully logged out!');
	} else {
		res.send("Not logged in");
	}
});
return router;
}