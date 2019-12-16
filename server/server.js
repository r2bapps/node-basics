const app = require('express')();

// App responds on '/' path when GET method.
app.get('/', async function(req, res) {
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  res.send('HelloWorld');
});

// App is listening on localhost and defined env port or 8080 by default. 
app.listen(port = process.env.PORT || 8080, function () {
  console.log(`Server running on http://localhost:${port}`);
});