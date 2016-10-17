# email-finder
An easy to use command-line based tool for finding a person's corporate e-mail given their first name, last name, and the host domain of that email address. 

This is a fairly simple reimplementation of [Kickbox.io](http://docs.kickbox.io/docs/using-the-api), but instead of testing a single email address, we'll be testing several at once using the many forms of corproate email syntax. Install the dependencies needed with `npm install`, go to [Kickbox.io](http://docs.kickbox.io/docs/using-the-api) to sign up and recieve an API key, place it in line 1 of email-finder.js:

```javascript
var kickbox = require('kickbox').client("YOUR_API_KEY_HERE").kickbox()
```
run the script with `node email-finder.js` and follow the onscreen prompts. 
Email addresses that return red are likely unused while green ones likely are used.

I created this script with the intent of reaching out to recruiters who were looking for engineers given not much information. I am not responsible for misuse or spam resulting from this program.

### TO DO:
- [ ] Roll out the email testing functionality within the script, without relying on an API
- [ ] Track false-positives and negatives
