var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var express = require('express');
var app = express()
var fs = require('fs')
var path = require('path')
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var bodyParser = require('body-parser')
var request = require('request')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



// app.use(express.static(__dirname + "/public"));
// app.use(app.router);

initialize();

app.get('/*', function(req, res){
	res.status(200);
	res.sendFile(path.join(__dirname, './public', 'index.html'));
});


// var ip = '127.0 .0.1'
var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
});


app.post('/', function(req, res){

	console.log('URL-Post Request Submitted:' + req.body.url)
	archive.readListOfUrls(function(data){
		archive.isUrlInList(req.body.url, data, function(bool){
			if(!bool){
				console.log("Adding " + req.body.url + " to list!")
				archive.addUrlToList(req.body.url, archive.downloadUri);
			}
			else{
				console.log("Already in list:" + req.body.url);
			}
		})
	})
res.redirect('back')//redirect to loading
});

// archive.isUrlInList('example1.com',console.log);


// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
// if (module.parent) {
//   module.exports = server;
// } else {
//   server.listen(port, ip);
// }

