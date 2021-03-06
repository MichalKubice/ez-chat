const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minglenght: 1,
    unique: true
  },
  name: {
    type: String,
    minglenght: 5,
    trim: true,
    required: true
  },
   password: {
    type: String,
    required: true,
    minglenght: 6,
  }, img: {
    type: String
  },
  lastSeen: {
    type: String
  },
  rooms: [{ type: mongoose.Schema.Types.ObjectId}],
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
  
});


UserSchema.methods.toJSON = function() {
var user = this;
var userObject = user.toObject();

return _.pick(userObject,["_id","email","name","img","lastSeen"]);
};


UserSchema.methods.generateAuthToken = function () {
  return new Promise((resolve, reject) => {
      const user = this;
      const access = 'auth';

      const token = jwt.sign({_id: user._id.toHexString(), access}, 'abs123').toString();

      resolve({access, token});
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;
  
  try {
    decoded = jwt.verify(token,"abs123")
  } catch(e) {
    return Promise.reject();
  }
  return User.findOne({
    "_id": decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });

};

UserSchema.statics.findByCredentials = function (email,password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject;
    }
    return new Promise((resolve,reject) => {
      bcrypt.compare(password, user.password, (err,res) => {
        if(res) {
          // const payload = {id: user_id, name: user.name, email: user.email}
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(next){
var user = this;

if (user.isModified("password")) {
  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(user.password,salt, (err,hash)=> {
      user.password = hash;
      next();
    });
  });
} else {
  next();
}
});
var User = mongoose.model("User", UserSchema);

module.exports = {User};