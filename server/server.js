const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/users', async function(req, res) {
  res.send(inMemoryUsers);
});
app.delete('/users', async function(req, res) {
  inMemoryUsers = [];
  inMemoryPosts = [];
  res.send(inMemoryUsers);
});
app.get('/users/:userId', async function(req, res) {
  const user = inMemoryUsers.find(user => user.id === req.params.userId);
  if (user) {
    res.send(user);
  } else {
    res.status(404);
    res.end();
  }
});
app.delete('/users/:userId', async function(req, res) {
  const user = inMemoryUsers.find(user => user.id === req.params.userId);
  if (user) {
    inMemoryUsers = inMemoryUsers.filter(it => it.id === userId);
    inMemoryPosts = inMemoryPosts.filter(post => post.userId === user.id);
    inMemoryPosts.forEach(post => {
      post.comments = post.comments.filter(comment => comment.userId === user.id);
    });
    res.send(user);
  } else {
    res.status(404);
    res.end();
  }
});
app.post('/users', async function(req, res) {
  // req.body: { name, surname, surname2 }
  const date = new Date();
  const user = Object.assign({
    id: (inMemoryUsers.length + 1).toString(10), 
    creationDate: date,
    lastModificationDate: date,
  }, req.body);
  inMemoryUsers.push(user);
  res.send(user);
});

app.get('/posts', async function(req, res) {
  res.send(inMemoryPosts);
});
app.delete('/posts', async function(req, res) {
  inMemoryPosts = [];
  res.send(inMemoryPosts);
});
app.get('/posts/:postId', async function(req, res) {
  const posts = inMemoryPosts.find(post => post.id === req.params.postId);
  if (posts) {
    res.send(posts);
  } else {
    res.status(404);
    res.end();
  }
});
app.delete('/posts/:postId', async function(req, res) {
  const post = inMemoryPosts.find(post => post.id === req.params.postId);
  if (post) {
    inMemoryPosts = inMemoryPosts.filter(it => it.id === post.id);
    res.send(post);
  } else {
    res.status(404);
    res.end();
  }
});
app.post('/posts', async function(req, res) {
  // req.body: { title, subitle, text, tags, userId }
  const date = new Date();
  const post = Object.assign({
    id: (inMemoryPosts.length + 1).toString(10), 
    creationDate: date, 
    lastModificationDate: date, 
    comments: [] 
  }, req.body);
  inMemoryPosts.push(post);
  res.send(post);
});

app.get('/posts/:postId/comments', async function(req, res) {
  const post = inMemoryPosts.find(post => post.id === req.params.postId);
  if (post) {
    res.send(post.comments);
  } else {
    res.status(404);
    res.end();
  }
});
app.delete('/posts/:postId/comments', async function(req, res) {
  const post = inMemoryPosts.find(post => post.id === req.params.postId);
  if (post) {
    post.comments = [];
    res.send(post.comments);
  } else {
    res.status(404);
    res.end();
  }
});
app.get('/posts/:postId/comments/:commentId', async function(req, res) {
  const post = inMemoryPosts.find(post => post.id === req.params.postId);
  if (post) {
    const comment = post.comments.find(comment => comment.id === req.params.commentId);
    if (comment) {
      res.send(comment);
    } else {
      res.status(404);
      res.end();
    }
  } else {
    res.status(404);
    res.end();
  }
});
app.delete('/posts/:postId/comments/:commentId', async function(req, res) {
  const post = inMemoryPosts.find(post => post.id === req.params.postId);
  if (post) {
    const comment = post.comments.find(comment => comment.id === req.params.commentId);
    if (comment) {
      post.comments = post.comments.filter(it => it.id === comment.Id);
      res.send(comment);
    } else {
      res.status(404);
      res.end();
    }
  } else {
    res.status(404);
    res.end();
  }
});
app.put('/posts/:postId/comments', async function(req, res) {
  // req.body: { text }
  const post = inMemoryPosts.find(post => post.id === req.params.postId);
  if (post) {
    const date = new Date();
    const comment = Object.assign({
      id: (post.comments.length + 1).toString(10), 
      creationDate: date, 
      lastModificationDate: date
    }, req.body);
    post.comments.push(comment);
    res.send(post);
  } else {
    res.status(404);
    res.end();
  }
});

// App is listening on localhost and defined env port or 8080 by default
app.listen(port = process.env.PORT || 8080, function () {
  console.log(`Server running on http://localhost:${port}`);
});