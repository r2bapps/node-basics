const express = require('express');

// App instance
const app = express();

// App sets public folder
// App responds on '/' path with public folder content
app.use(express.static('public'));

// App responds on '/helloworld' path when GET method
app.get('/helloworld', async function(req, res) {
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  res.send('HelloWorld');
});

// App is listening on localhost and defined env port or 8080 by default
app.listen(port = process.env.PORT || 8080, function () {
  console.log(`Server running on http://localhost:${port}`);
});