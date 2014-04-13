var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var https = require('https');
var hbs = require('handlebars');

var logfmt = require("logfmt");
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var app = express();
app.use(cookieParser());
app.use(require("connect").session({ secret: 'keyboard cat'}))
app.use(passport.initialize());
app.use(passport.session());


app.use(logfmt.requestLogger());

app.get('/', function(req, res){
	console.log(req.headers.cookie);
	fs.readFile('./index.hbs', function(err, data){
		if(err) throw err;
		var template = hbs.compile(data.toString());
		res.send(template());
	});
});

app.get('/my_newsfeed', function(req, res){
	fs.readFile('./newsfeed.hbs', function(err, data){
		if(err) throw err;
		var template = hbs.compile(data.toString());
		res.send(template());
	});
});


passport.use('twitter', new TwitterStrategy({
    consumerKey:  't7odRpuG6cgBWWGUfQEQir5ZS',
    consumerSecret: 'zhrpEwTLP8JT1FtymlTBsDetEHu7z0y0rGO0CDxyvS9Ep3el22',
    callbackURL: "http://intense-beyond-2800.herokuapp.com/my_newsfeed"
  },
  function(token, tokenSecret, profile, done) { 
     console.log(token + "\n" + tokenSecret);
     done(null, null);
  }
));

app.get('/auth/twitter', passport.authorize('twitter'));
app.get('/my_newsfeed', 
  passport.authorize('twitter', { successRedirect: '/my_newsfeed',
                                     failureRedirect: '/error' }));

var port = Number(process.env.PORT || 5000 );
app.listen(port, function() {
	console.log("Listening on " + port);
});
