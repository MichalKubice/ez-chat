const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://Michy123:12345@ez-chat-shard-00-00-ruc7c.mongodb.net:27017,ez-chat-shard-00-01-ruc7c.mongodb.net:27017,ez-chat-shard-00-02-ruc7c.mongodb.net:27017/test?ssl=true&replicaSet=ez-chat-shard-0&authSource=admin&retryWrites=true", {
    useMongoClient: true
});

module.exports = {mongoose};
