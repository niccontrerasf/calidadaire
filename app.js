var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var api = require('./routes/api');
app.use('/api',api);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.all('*',function(req,res){
    res.status(404);
    res.end('404 not found');
});

var port = 80;
var aqicn_token = "8954e06d154a2fb3f0c790f8b4458139485474e3";

app.listen(port,function(){
	console.log("Listen in port " + port);
});

module.exports = app;