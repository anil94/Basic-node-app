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

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log
  res.sendFile('home.html',{'root': __dirname + '/../templates'});
});

module.exports = router;
