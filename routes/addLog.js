var data = require("../data.json");


exports.addLog = function(request, response) {    
	// Your code goes here
	
	json = {'task': request.query.inputLog,'description':'a description here'};
	console.log(json);
	data.logList.push(json);
	
 }
