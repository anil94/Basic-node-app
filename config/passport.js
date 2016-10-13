var LocalStrategy   = require('passport-local').Strategy;
var Users = require('../config/user').Users;
var passwordhash = require('password-hash');

module.exports = function(passport) {
	passport.serializeUser(function(user, callback) {
		var sessionUser = {
			id: user.id,
			Username: user.Username,
			Email: user.Email,
			IsAdmin: user.IsAdmin
		}
        callback(null, sessionUser);
    });

    passport.deserializeUser(function(user, callback) {
    	console.log("Inside deserialize")
        /*Users.findOne({ 
        	where: { 'Username': user.Username } 
        })
        .then(function(user) {
        	if(user == null)
        		callback(null, false, "Invalid credentials")
        	else
            	callback(null, user);
        });*/
    	callback(null, user)
    });

    passport.use('local-login', new LocalStrategy(
    	{
    		passReqToCallback : true
    	},
    	function(req, username, password, callback) {
    		if(req.user) {
    			callback(null, req.user, "Already logged in!")
    		} else {
	    		Users.findOne({
	    			where: { 'Username': username }
	    		})
	    		.then(function(user) {
	    			if(user && passwordhash.verify(password, user.PasswordHash)) {
	    				req.logIn(user, function() {})
	    				return callback(null, user, "Successfully logged in")
	    			} else {
	    				return callback(null, false, "Invalid username or password")
	    			}
	    		})
	    	}
    	}
    ))
}