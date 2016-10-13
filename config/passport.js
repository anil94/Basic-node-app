var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Users = require('../config/user').Users;
var passwordhash = require('password-hash');

var configAuth = require('./auth');

module.exports = function(passport) {
	passport.serializeUser(function(user, callback) {
		var sessionUser = {
			id: user.id,
			Email: user.Email
		}
        callback(null, sessionUser);
    });

    passport.deserializeUser(function(user, callback) {
    	console.log("Inside deserialize")
    	callback(null, user)
    });

    // login using local account
    passport.use('local-login', new LocalStrategy(
    	{
    		passReqToCallback : true
    	},
    	function(req, username, password, callback) {
    		// Get user info from db
	    	Users.local.findOne({
	    		where: { 'Username': username }
	    	})
	    	.then(function(user) {
	    		// check if user exists and passwords match
	    		if(user && passwordhash.verify(password, user.PasswordHash)) {
	    			req.logIn(user, function() {})
	    			return callback(null, user, "Successfully logged in")
	    		} else {
	    			return callback(null, false, "Invalid username or password")
	    		}
	    	})
    	}
    ))

    // login using google
    passport.use(new GoogleStrategy({
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,
            passReqToCallback : true
        },
        function(req, token, refreshToken, profile, callback) {
        	//check if already signed in using local account
       		Users.local.findOne({
       			where: {'Email': profile.emails[0].value}
       		})
       		.then(function(localuser) {
       			// if localuser found log in using that account
       			if(localuser) {
       				return callback(null, localuser, "Logged in with same local account..")
       			} else {
       				// local account not found.. Check google account exists..
       				Users.google.findOne({
	    				where: { 'GoogleId': profile.id }
		    		})
		    		.then(function(user) {
		    			// If google account exists log in user with google account
		    			if(user) {
		    				req.logIn(user, function() {})
		    				return callback(null, user, "Successfully logged in")
		    			} else {
		    				// Create new google user and log in
		    				Users.google.create({
		    					GoogleId: profile.id,
		    					Email: profile.emails[0].value,
		    					Token: token,
		    					Name: profile.displayName
		    				})
		    				.then(function(newuser) {
		    					req.logIn(user, function() {})
		    					return callback(null, newuser, "Successfully signed in")
		    				})
		    			}
		    		})
       			}
        	})
        }
    ))
}