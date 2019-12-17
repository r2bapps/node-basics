const express = require('express');
const bodyParser = require('body-parser');
const { users, posts, comments } = require('./routes');

const inMemoryPosts = [];
const inMemoryUsers = [];

// App instance
const app = express();

// App sets public folder
// App responds on '/' path with public folder content
app.use(express.static('public'));

// App parses form inputs automatically on body (x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// App parses body as JSON object
app.use(bodyParser.json());

users.init(app, inMemoryUsers, inMemoryPosts);
posts.init(app, inMemoryUsers, inMemoryPosts);
comments.init(app, inMemoryUsers, inMemoryPosts);

// App is listening on localhost and defined env port or 8080 by default
app.listen(port = process.env.PORT || 8080, function () {
  console.log(`Server running on http://localhost:${port}`);
});