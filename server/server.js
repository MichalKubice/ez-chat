const express = require("express");
const {mongoose} = require("./db/mongoose");
const {ObjectID} = require("mongodb");

const {authenticate} = require("./middleware/authenticate")
const {User} = require("./models/user");
const {Room} = require("./models/room");
const {Message} = require("./models/message");
const bodyParser = require("body-parser");
const _ = require("lodash");
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());

// SAVE USER INTO DB
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password',"name"]);
  const user = new User(body);

  user.generateAuthToken()
  .then((result) => {
      user.tokens = user.tokens.concat([result]);

      user.save()
      .then ((user) => res.header('x-auth', result.token).send(user))
      .catch(err => res.status(400).send(err));

  });
});


app.post('/users/login', (req,res) => {
  var body = _.pick(req.body, ['email','password']);
  
  User.findByCredentials(body.email,body.password).then((user) => {
    return user.generateAuthToken()
    .then((result) => {
        user.tokens = user.tokens.concat([result]);
  
        user.save()
        .then ((user) => res.header('x-auth', result.token).send(user))
    });
  }).catch((e) => {
    res.status(404).send();
  });
});

app.delete('/users/me/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.get("/users/me", authenticate, (req,res) => {
  res.send(req.user);
});

app.listen(port, () => console.log(`Server is now listening on ${port}`));