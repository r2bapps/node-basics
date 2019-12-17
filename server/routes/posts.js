const init = (app, inMemoryUsers, inMemoryPosts) => {
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
};

module.exports = { init };