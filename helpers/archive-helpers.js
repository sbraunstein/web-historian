var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request')


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
	fs.readFile(exports.paths.list, function(err, data){
		if(err){
			throw err;
		} else { 
		var data = data.toString().split('\n');
		console.log('Current dataList: ' + data)
		callback(data)
		}
	})
};

exports.isUrlInList = function(url,data, callback){
	var bool = false;
	for(var i = 0; i < data.length; i++){
		if(data.indexOf(url) !== -1){
			bool = true;
		}
	}
	callback(bool)
};

exports.addUrlToList = function(url, callback){
	fs.appendFile(exports.paths.list, url+='\n', function(err){
		if(err){
			console.log('isURL in list error')
			throw err;
		} else {
			console.log('SUCESS!: ' + url + " added to sites.txt")
			callback(url);
		}
	})
};

exports.isUrlArchived = function(url){
};

exports.downloadUrls = function(){

};


exports.downloadUri = function(url,callback){
	request(url, function(err,response,html){
		console.log(typeof html)
		if(err){

			console.log("downloadURI error:" err)
		} else{
			callback(response)
		}
	})
}