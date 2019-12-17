
const init = (app, inMemoryUsers, inMemoryPosts) => {
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
      inMemoryUsers = inMemoryUsers.filter(it => it.id === user.id);
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
};

module.exports = { init };
