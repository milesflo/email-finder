var axios = require('axios');
var jquery = require('jquery');

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
            first+last+domain,
            first+"."+last+domain,
            first+"."+last.slice(0,1)+domain,
            first.slice(0,1)+last+domain,
            first+last.slice(0,1)+domain,
            first+last.slice(0,3)+domain
          ];

for (var i = 0; i < parseCases.length; i++) {
  var thisIter = parseCases[i];

axiosCall(thisIter);

}
});

function axiosCall(thisIter) {

  var MB_URL = 'http://apilayer.net/api/check?access_key=';
  var access_key = process.env.API_KEY;
  var requestUrl = `${MB_URL}${access_key}&email=${thisIter}`;

  axios.get(requestUrl)
    .then(function (response) {
      console.log(thisIter);
      console.log(response.data.smtp_check);
      console.log(response.data.score);
    })
    .catch(function (error) {
      console.log(error);
    });
}
