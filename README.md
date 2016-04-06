# email-finder
CLI email validator

An easy to use CLI tool for finding a person's corporate e-mail given their first name, last name, and the host domain of that email address.

After cloning the repository, run the following lines.

`
npm install
`

then, go to [Kickbox.io](http://docs.kickbox.io/docs/using-the-api) to recieve your API key. Once you have it, edit line 1 of email-finder.js:
```javascript
var kickbox = require('kickbox').client("YOUR_API_KEY_HERE").kickbox()
```

then finally run the script with 
`
node email-finder.js
`