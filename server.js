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

app.listen(8000);