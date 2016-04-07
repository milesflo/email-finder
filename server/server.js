var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	morgan 		= require("morgan"),
    dotenv      = require('dotenv')
    path        = require('path'),
    verifier    = require('email-existence');

dotenv.load();

app.use(morgan('dev'));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname,'../', 'index.html'));
});

app.get('/apireq', function(req, res) {
	console.log(req.query);
	var resArray = [],
		first  = req.query.name,
		last   = req.query.last,
		domain = "@" + req.query.host;

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
		console.log(thisIter);
		verifier.verify(parseCases[i], function(err, info){
			if( err ) console.log(err);
			else{
				resArray.push(info);
				console.log( "Success (T/F): " + info.success );
				console.log( "Info: " + info.info );
			}
		})
	}
	res.json({
		result: resArray
	});
});

function cbGenerator(thisIter) {
	return function (err, response) {
			if (err) {
				console.log(err);
				return;
			}

			if (response.body.result == "deliverable") {
				return true;
			}  else if (response.body.result == "undeliverable") {
				return false;
			}
		}
}

app.use(function(req, res, next){
  res.status(404);
  res.redirect('/#/')
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});
