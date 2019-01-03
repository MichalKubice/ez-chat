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
app.put('/rooms/:id', authenticate, (req,res) => {
  var id = req.params.id;
  var user = req.user;

  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  User.findOneAndUpdate({_id: req.user._id}, { $addToSet: { rooms: id }}).then((user) => {
    console.log("succes");
  }).catch((e) => {
    console.log("fail");
  });
  Room.findOneAndUpdate({_id:id, password:req.body.password},{ $addToSet: { participants: req.user._id }}, {new:true}).then((room) => {
    if (room) {
      res.send(room).status(200);
    }
    else {
      res.status(401).send("wrong password");
    }


  }).catch((err) => {
    res.send().status(401)
  })
});
//GET USER ROOMS
app.get("/rooms", authenticate, (req,res) => {
  Room.getRoom(req.user._id).then((rooms) => {
    res.status(200).send(rooms);
  }).catch((e) => {
    res.status(404).send();
  })

});
// SEND MESSAGE
app.post("/reply/:id", authenticate, (req,res) => {
  const id = req.params.id;
  Room.findOne({
    _id:id,
    participants: req.user._id
  }).then((room)=> {
    if (room) {

    
    const message = new Message({
      conversationId: id,
      body: req.body.body,
      author: req.user._id
    });
    
      message.save().then((mess) => {
      res.send(mess).status(200);
    }).catch((e) => {
      res.send().status(404);
    })
  } else {
    return res.status(401).send("you are not in this room");
  }
  }).catch((e)=>{
    res.status(404).send();
  });
});

//GET ROOM MESSAGES
app.get("/:id", authenticate, (req,res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Room.findOne({
    _id:id,
    participants: req.user._id
  }).then((room) => {
    if(room){

    
    Message.find({
      conversationId:id
    }).then((messages) => {

      var mess = _.map(messages, function(currentObject) {
        return _.pick(currentObject, "body", "author","createdAt");
    });




      res.send(mess).status(200);
    }).catch((e) => {
      res.send().status(400);
    })} else {
      res.status(401).send("Ur not in this room");
    }
  }).catch((e)=>{
    res.send().status(404);
  })
});

//----
app.get("/users/me", authenticate, (req,res) => {
  res.send(req.user);
});

app.listen(port, () => console.log(`Server is now listening on ${port}`));

//1. LOG IN - create token and find req.user.rooms in DB and show them
//2. Create room - create room into DB, adds user.id to room.participants and room.id to user.rooms
//3. Join room - 
//4. Show room - find messages by room.id in the DB, load them and make socket connetion - make user online
//5. Send message - socket.io and save it into db.


//ROUTES 
// ROOMS : 
// CREATE ROOM - POST
// JOIN ROOM - PUT
// DELETE ROOM - DELETE
// LEAVE ROOM - DELETE / PUT
// LOAD ROOMS - GET

// USER :
// REGISTER - POST
// LOGIN - POST



// MESSAGE : 
// SEND - POST
// LOAD - GET
