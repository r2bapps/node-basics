const init = (app, inMemoryUsers, inMemoryPosts) => {
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
};

module.exports = { init };