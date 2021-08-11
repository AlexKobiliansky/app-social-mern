const socket = require("socket.io")
const {Server} = require("socket.io");
const http = require("http");

module.exports = (http) => {
  const io = new Server(http);
  return io;
};