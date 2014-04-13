var express = require('express');
var fs = require('fs');
var https = require('https');
var hbs = require('handlebars');

var app = express();

app.get('/', function(req, res){
	fs.readFile('./index.hbs', function(err, data){
		if(err) throw err;
		var template = hbs.compile(data.toString());
		res.send(template());
	});
});

app.get('/login', function(req,res){

});

app.get('/my_newsfeed', function(req, res){
	fs.readFile('./newsfeed.hbs', function(err, data){
		if(err) throw err;
		var template = hbs.compile(data.toString());
		res.send(template());
	});
});

var port = Number(process.env.PORT || 5000 );
app.listen(port, function() {});
