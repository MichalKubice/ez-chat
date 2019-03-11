const express = require("express");
const _ = require("lodash");
const http = require("http");
const bodyParser = require("body-parser");
const users = require("./api/users");
const rooms = require("./api/rooms");

var app = express();
var server = http.createServer(app);

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use("/profile/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/rooms", rooms);

server.listen(port, () => console.log(`Server is now listening on ${port}`));