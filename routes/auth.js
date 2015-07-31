var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/logout', function (req, res, next) {
  req.session = null
  res.redirect('/')
});

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/',
    successRedirect: '/'
  }));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
});
  
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('in stuff')
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router;