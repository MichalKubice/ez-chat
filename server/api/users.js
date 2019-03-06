const express = require("express");
const router = express.Router();
const validateLoginInput = require("../validation/login");
const {ObjectID} = require("mongodb");
const _ = require("lodash");
const multer = require("multer");

const {User} = require("../models/user");
const {authenticate} = require("../middleware/authenticate");
const validateRegisterInput = require("../validation/register");
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,"./uploads/");
  },
  filename: function(req,file,cb) {
    cb(null, Date.now() + file.originalname)
  }
});
const fileFilter = (req,file,cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null,true)
  } else {
    cb(null,false);
  }
  
}
const upload = multer({
  storage: storage, 
  limits: {
  fileSize: 500 * 500 * 500
},
fileFilter: fileFilter
});

// SAVE USER INTO DB
router.post('/register', (req, res) => {
  const { errors , isValid} = validateRegisterInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email}).then((user) => {
    if(user) {
      errors.email = "Email already exists"
      return res.status(400).json(errors);
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        rooms: [],
        img: "uploads/default.png",
        lastSeen: new Date().toLocaleTimeString()
      });
    
          user.save()
          .then ((user) => res.json(user))
          .catch(err => res.status(400).send(err));
    
    }
  }).catch((e)=> {
    res.send(e);
  })
  });
router.post('/login', (req,res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
    var body = _.pick(req.body, ['email','password']);
    
    User.findByCredentials(body.email,body.password).then((user) => {
      return user.generateAuthToken()
      .then((result) => {
          user.tokens = result
          user.lastSeen = new Date().toLocaleTimeString();
          user.save()
          .then ((user) => res.header('x-auth', result.token).send(user))
      });
    }).catch((e) => {
      errors.email = "Email or password incorrect."
      res.status(404).send(errors);
    });
  });
  //IMG

  router.put("/img", authenticate, upload.single("img"), (req,res) => {
    if(req.file){

    
    User.findOneAndUpdate({_id:req.user._id},{ $set: { img: req.file.path }}, {new:true}).then((user) => {
      res.send(user)
    }).catch((err) => {
      res.status(404).send();
    })
  } else {
    res.status(401).send("No file");
  }
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
router.get("/me", authenticate, (req,res) => {
  res.send(req.user).status(200);
});

  module.exports = router;
