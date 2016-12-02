var express = require('express');
var router = express.Router();

var Account = require('../models/account');

var passport = require('passport');
var flash = require('connect-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assignment Tracker',
  user: req.user
  });
});

/* GET signup */
router.get('/signup', function(req, res, next) {
  res.render('signup', {
      title: 'Sign Up',
      user: req.user
  });
});

/* POST signup */
router.post('/signup', function(req, res, next) {
  // using  account and passport to crreate new user
  Account.register(new Account(
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
      });
});

/* GET login */
router.get('/login', function(req, res, next) {

    var messages = req.session.messages || [];

    // clear the session messages
    req.session.messages = [];

    res.render('login', {
        title: 'Login',
        messages: messages,
        user: req.user
    });
});

/* POST login */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/assignments',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login',
    failureFlash: true
}));

/* GET for logout*/
router.get('/logout', function(req, res, next) {
    //log out the user andd redirect
    req.logout();
    res.redirect('/login');
});

/* GET /facebook */
router.get('/facebook', passport.authenticate('facebook'), function(req, res, next) {});

/* GET /facebook/callback */
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    failureMessage: '/Invalid Login'
}), function(req, res, next){
    res.redirect('/assignments');
});

module.exports = router;
