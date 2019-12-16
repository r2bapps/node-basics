const express = require('express');
const bodyParser = require('body-parser');

// App instance
const app = express();

// App sets public folder
// App responds on '/' path with public folder content
app.use(express.static('public'));

// App parses form inputs automatically on body (x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// App parses body as JSON object
app.use(bodyParser.json());

// App responds on '/helloworld' path when GET method
app.get('/helloworld', async function(req, res) {
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  res.send('HelloWorld');
});

// App responds on '/login' path when POST method
app.post('/login', async function(req, res) {
  // Check: "content-type":"application/x-www-form-urlencoded" on headers
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  // Check: {"username":"bla bla","password":"bla bla"} on body as JSON object
  console.log(`Body: ${JSON.stringify(req.body)}`);
  res.send(`Welcome user ${req.body.username}`);
});

// App responds on '/comment' path when POST method
// Test it with POST comment on POSTMAN collections
app.post('/comment', async function(req, res) {
  // Check: "content-type":"application/json" on headers
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  // Check: {"title":"bla bla","comment":"bla bla"} on body as JSON object
  console.log(`Body: ${JSON.stringify(req.body)}`);
  res.send(`Comment ${req.body.title} received`);
});

// App responds on '/comment' path when PUT method
// Test it with POST comment on POSTMAN collections (change to PUT)
app.put('/comment', async function(req, res) {
  res.send(`ok`);
});

// App responds on '/comment' path when DELETE method
// Test it with POST comment on POSTMAN collections (change to DELETE)
app.delete('/comment', async function(req, res) {
  res.send(`ok`);
});

// App is listening on localhost and defined env port or 8080 by default
app.listen(port = process.env.PORT || 8080, function () {
  console.log(`Server running on http://localhost:${port}`);
});