var data = require("../data.json");
var today = new Date().toLocaleDateString(undefined, {
    day:'numeric',
    month: 'numeric',
    year: 'numeric'
})


exports.addLog = function(request, response) {    
	// Your code goes here
	
	json = {'task': request.query.inputLog,'description': today};
	console.log(json);
	data.logList.push(json);
	
 }
