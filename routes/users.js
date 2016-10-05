var express = require('express');
var router = express.Router();
// var session = require('express-session');

var app = express();

/*app.use(session({
  secret: 'This is a secret that nobody knows!',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
