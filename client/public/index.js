var socket = io();

socket.on("connect", function () {
    console.log("Succesfully connected.")
});
socket.on("disconnect", function () {
    console.log("Succesfully disconnectd.")
});
socket.on("getMessages",function() {
    console.log("connected to the room.")
})