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

// LOGIN

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


// CREATE ROOM INTO DB

app.post('/rooms', authenticate, (req,res) => {
  var body = req.body;
  var room = new Room({
    name: body.name,
    creator: req.user._id,
    password: req.body.password,
    participants: req.user._id
  });
  room.save()
  .then((room) => {
    res.status(200).send(room);
    var user = req.user;
    user.rooms = user.rooms.concat([room]);
    user.save()
    .then((req,res)=>{
      res.status(200);
    })
    .catch((e) => {
      res.status(404).send();
    })
  })
  .catch((e) => {
    res.status(400).send();
    console.log("Room already exists")
  });
});

// FIND ROOM BY ID WITH PASSWORD -- ?JOIN ROOM

app.get('/rooms/:id', authenticate, (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,["password"]);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Room.findOne({
    _id:id
  }).then((room) => {
    if (room.password !== body.password) {
      res.status(401).send();
    }
    if (!room) {
      res.status(404).send();
    }

    res.send(room).status(200);
  }).catch((e) => {
    res.status(400);
  });
});
//PUT 
// JOIN ROOM 
// TODO : SAVE IT TO USER ROOMS 
app.put('/rooms/:id', authenticate, (req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Room.findOneAndUpdate({_id:id, password:req.body.password},{ $addToSet: { participants: req.user._id } }).then((room) => {
    return res.send(room).status(200)
  }).catch((err) => {
    res.send().status(401)
  })
});

//----
app.get("/users/me", authenticate, (req,res) => {
  res.send(req.user);
});

app.listen(port, () => console.log(`Server is now listening on ${port}`));