const express = require("express");
const router = express.Router();
const validateLoginInput = require("../validation/login");

const _ = require("lodash");

const {User} = require("../models/user");
const {authenticate} = require("../middleware/authenticate");
const validateRegisterInput = require("../validation/register");


// SAVE USER INTO DB
router.post('/register', (req, res) => {
  const { errors , isValid} = validateRegisterInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email}).then((user) => {
    if(user) {
      errors.email = "Email already exists"
      return res.status(400).json(errors);
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      user.generateAuthToken()
      .then((result) => {
          user.tokens = user.tokens.concat([result]);
    
          user.save()
          .then ((user) => res.header('x-auth', result.token).json(user))
          .catch(err => res.status(400).send(err));
    
      });
    }
  }).catch((e)=> {
    res.send(e);
  })
  });
router.post('/login', (req,res) => {
  const { errors,isValid } = validateLoginInput(req.body);
    var body = _.pick(req.body, ['email','password']);
    
    User.findByCredentials(body.email,body.password).then((user) => {
      return user.generateAuthToken()
      .then((result) => {
          user.tokens = user.tokens.concat([result]);
    
          user.save()
          .then ((user) => res.header('x-auth', result.token).send(user))
      });
    }).catch((e) => {
      errors.email = "Email or password incorrect."
      res.status(404).send(errors);
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