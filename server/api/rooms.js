const express = require("express");
const router = express.Router();

const _ = require("lodash");
const {ObjectID} = require("mongodb");
const {User} = require("../models/user");
const {Room} = require("../models/room");
const {Message} = require("../models/message");
const {authenticate} = require("../middleware/authenticate");
const validateRoomInput = require("../validation/rooms");
const validateJoinInput = require("../validation/join");
// CREATE ROOM INTO DB

router.post('/', authenticate, (req,res) => {
  const { errors, isValid } = validateRoomInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
    var body = req.body;
    var room = new Room({
      name: body.roomName,
      creator: req.user._id,
      password: req.body.password,
      participants: req.user._id,
      userList: req.user.name
    });
    room.save()
    .then((room) => {
      res.status(200).send(room);
      User.findOneAndUpdate({_id:req.user._id},{ $addToSet: { rooms:  room._id}}, {new:true}).then((room) => {
        if (room) {
          res.json(room).status(200);
        } 
        else {
          
          return res.status(400).json("fuckup");
        }
    
    
      }).catch((err) => {
        res.send().status(401)
        errors.password = "Failed."
      })
    })
    .catch((e) => {
      res.status(400).send();
      errors.roomName = "Room already exists"
    });
      
  });
  router.get("/room/:id", authenticate, (req,res) => {
    let id = req.params.id;
    Room.findOne({_id: id}).then((room) => {
      if (!ObjectID.isValid(id)) {
        res.status(404).send("Bad.");   
      }
      if(!room) {
        res.status(404).json("nothing")
      } else {
        res.status(200).json(room.userList);
      }
    }).catch((e) => {
      res.send().status(400);
    })
  });
  
  // FIND ROOM BY ID WITH PASSWORD -- ?JOIN ROOM

router.get('/get/:id', authenticate, (req,res) => {
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
  
// JOIN ROOM 
router.put('/join', authenticate, (req,res) => {
  const { errors, isValid } = validateJoinInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
    var id = req.body.id;
    var user = req.user;
  
    if (!ObjectID.isValid(id)) {
      errors.id = "wrong id";
      res.status(404).json(errors);
      
    }
    Room.findOneAndUpdate({_id:id, password:req.body.password},{ $addToSet: { participants: req.user._id, userList: req.user.name }}, {new:true}).then((room) => {
      if (room) {
        res.json(room).status(200);
        User.findOneAndUpdate({_id:req.user._id},{ $addToSet: { rooms:  room._id}}, {new:true}).then((room) => {
          if (room) {
            res.json(room).status(200);
          } 
          else {
            
            return res.status(400).json("fuckup");
          }
      
      
        }).catch((err) => {
          res.send().status(401)
          errors.password = "Failed."
        })
      } 
      else {
        errors.id = "Wrong password"
        return res.status(400).json(errors);
      }
  
  
    }).catch((err) => {
      res.send().status(401)
      errors.password = "Room already exists"
    })
  });


// LEAVE ROOM

router.delete("/:id", authenticate, (req,res) => {
    var id = req.params.id;
    var userId = req.user._id;
    var userName = req.user.name
    console.log(userId)
  
    Room.findOneAndUpdate({
      _id:id,
      participants: userId
    },{
      $pull: {
        participants: userId,
        userList: userName
      },
    }, {
      new: true
    }).then((room) => {
      if(room) {
        res.send(room).status(200);
        User.findOneAndUpdate({_id:req.user._id},{ $pull: { rooms:  room._id}}, {new:true}).then((room) => {
          if (room) {
            console.log("succes.")
          } 
          else {
            
            return res.status(400).json();
          }
        }).catch((err) => {
          console.log(err)
        })
  
      } else {
        res.status(401).send("Ur already not in this room");
      } 
    }).catch((e) => {
      res.send(e).status(404);
    })
  });
  
//GET USER ROOMS
router.get("/", authenticate, (req,res) => {
    Room.getRoom(req.user._id).then((rooms) => {
      res.status(200).json(rooms);
    }).catch((e) => {
      res.status(404).send();
    })
  
  });

  //GET ROOM MESSAGES

router.get("/:id", authenticate, (req,res) => {
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
      }).sort({createdAt: -1}).then((messages) => {
        var mess = _.map(messages, function(currentObject) {
          return _.pick(currentObject, "body", "author","createdAt", "img","time");
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

  router.get("/users/:id",(req,res) => {
    const id = req.params.id;
    User.find({
      rooms:id
    }).then((users) => {
      res.send(users).status(200);
    }).catch((e) => {
      res.send().status(400);
    })
  })
  // SEND MESSAGE
router.post("/:id", authenticate, (req,res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Room.findOne({
      _id:id,
      participants: req.user._id
      
    }).then((room)=> {
      if (room) {
        var d = new Date();
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];
var t = new Date().toLocaleTimeString();

      const message = new Message({
        conversationId: id,
        body: req.body.body,
        author: req.user.name,
        img: req.user.img,
        time: `${n}, ${t}`
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
  
module.exports = router;