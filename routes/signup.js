var express = require('express');
var Sequelize = require('sequelize');
var passwordhash = require('password-hash');

var router = express.Router();

var sequelize = require('../config/user').Sequelize;
var Users = require('../config/user').Users;
var template_root = __dirname + '/../templates'


router.get('/', function(req, res) {
	if (req.session.username)
		res.send('Hi, ' + req.session.username);
	else {
		res.sendFile('/signin.html',{'root': template_root});
	}
})

/* New user signup option. */
router.post('/', function(req, res) {
	console.log(req.body);
	req.assert('username', 'Username is too short').len(6);
	req.assert('email', 'Invalid email').isEmail();
	req.assert('password', 'Password is too short').len(6)
	req.assert('confirmPassword', 'Passwords donot match').equals(req.body.password)
	var errors = req.validationErrors()
	
	if (errors) {
		res.send({'status': "Failed", 'errors': errors});
	} else {
		sequelize.sync()
		.then(function() {
			Users.create({
				Username: req.body.username,
				Email: req.body.email,
				PasswordHash : passwordhash.generate(req.body.password)
			})
			.then(function(user) {
				req.session.username = user.Username
				res.send("Successfully signed in!")
				console.log(users.get({
					plain: true
				}));
			})
			.catch(Sequelize.Error, function(err) {
				console.log(err.errors);
				var errors = []
				err.errors.forEach(function(error) {
					errors.push(
									{
										'msg': error.message,
										'param': error.path,
										'value': error.value
									}
								);
				})
				res.send({'status': "Failed", 'errors': errors});
			})
			.catch(function(err) {
				console.log(err);
				// res.redirect('/');
			});
		});
	}
});

module.exports = router;