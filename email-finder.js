var verifier = require('email-validator'),
	email    = 'milesflo15@gmail.com';

function testEmail (input) {
	console.log(verifier.validate(input));
}

testEmail(email);