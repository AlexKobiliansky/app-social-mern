const socket = require("socket.io")
const {Server} = require("socket.io");
const http = require("http");

module.exports = (http) => {
  const io = new Server(http);
  // io.on('connection', function(socket){
  //   socket.on('DIALOGS:JOIN', (dialogId) => {
  //     socket.dialogId = dialogId;
  //     socket.join(dialogId);
  //   });
  //
  //   socket.on('DIALOGS:TYPING', (obj) => {
  //     socket.emit('DIALOGS:TYPING', obj)
  //   })
  // });

  return io;
};