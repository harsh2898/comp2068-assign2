var express = require('express');
var router = express.Router();

var Account = require('../models/account');

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assignment Tracker' });
});

/* GET signup */
router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: 'Sign Up'
  });
});

/* POST signup */
router.post('/signup', function(req, res, next) {
    console.log("uname" + req.body.username);
    res.end(req.body.username);
    return;
  // using  account and passport to crreate new user
  /*Account.register(new Account(
      {username: req.body.username }),
      req.body.password,
      function(err, account) {
        if (err) {
          console.log(err);
          res.redirect('/signup')
        }
        else {
          res.redirect('/login');
        }
      });*/
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

/* POST login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/assignments',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
