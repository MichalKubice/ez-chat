const express = require("express");
const router = express.Router();

const _ = require("lodash");

const {User} = require("../models/user");
const {authenticate} = require("../middleware/authenticate");


// SAVE USER INTO DB
router.post('/', (req, res) => {
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
  router.get("/test",(req,res) => res.json({msg:"Lol"}));
  // LOGIN

router.post('/login', (req,res) => {
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

  // LOG OUT

router.delete('/me/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send("logged out");
  }, () => {
    res.status(400).send();
  });
});
//---- GET USER
router.get("/users/me", authenticate, (req,res) => {
  res.send(req.user);
});

  module.exports = router;