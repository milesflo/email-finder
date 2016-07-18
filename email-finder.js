var kickbox = require('kickbox').client("").kickbox(),
	dotenv  = require('dotenv'),
	prompt  = require('prompt'),
	colors  = require('colors/safe');

dotenv.load();


var schema = {
	properties: {
		name: {
			pattern: /^[a-zA-Z]+$/,
			description: 'Target first name',
			required: true,
			type: 'string',
			hidden: true, 
		},
		last: {
			pattern: /^[a-zA-Z]+$/,
			description: 'Target last name',
			required: true,
			type: 'string',
			hidden: true, 
		},
		domain: {
			pattern: /^[a-z.\s\-]+$/,
			description: 'Target host domain',
			required: true,
			type: 'string',
			hidden: true, 
		}
	}
};

prompt.start();

prompt.get(schema, function (err, result) {
	if (err) {
		console.log(err);
		return;
	}

	var first  = result.name,
		last   = result.last,
		domain = "@" + result.domain;

	var parseCases = 	[	
							first+domain,
							first+"."+last+domain, 
							first+"."+last.slice(0,1)+domain,
							first.slice(0,1)+last+domain,
							first+last.slice(0,1)+domain,
							first+last.slice(0,3)+domain
						];

	for (var i = 0; i < parseCases.length; i++) {
		var thisIter = parseCases[i];

		kickbox.verify(parseCases[i], cbGenerator(thisIter));
	}
});

function cbGenerator(thisIter) {
	return function (err, response) {
			if (err) {
				console.log(err);
				return;
			}

			if (response.body.result == "deliverable") {
				console.log("Valid : " + colors.green(thisIter));
			}  else if (response.body.result == "undeliverable") {
				console.log(colors.red(thisIter));
			}
		}
}
