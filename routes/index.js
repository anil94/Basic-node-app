//var express = require('express');

// var session = require('express-session');

//var app = express();

/*app.use(session({
  secret: 'This is a secret that nobody knows!',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));*/

module.exports = function(app, express, passport) {
	var router = express.Router();
	/* GET home page. */
	router.get('/', function(req, res) {
	  res.sendFile('home.html',{'root': __dirname + '/../templates'});
	});
	return router;
}
//module.exports = router;
