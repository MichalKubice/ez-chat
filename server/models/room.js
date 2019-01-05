const mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        minlength: 3
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId}]
});
RoomSchema.statics.getRoom = function(userid) {
    var room = this;
    return Room.find({"participants" : userid});
};

var Room = mongoose.model("Room", RoomSchema);
module.exports = {Room};