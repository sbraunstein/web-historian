var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var express = require('express');
var app = express()
var fs = require('fs')
var path = require('path')
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');



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

archive.readListOfUrls();



// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore

// if (module.parent) {
//   module.exports = server;
// } else {
//   server.listen(port, ip);
// }

