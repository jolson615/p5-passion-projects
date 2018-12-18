const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = express()
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



const io = socketIO(server);

io.on('connection', newConnection);

var objects = []

function newConnection(socket) {
  console.log("new connection" + socket.id)
  socket.emit('loadPage', objects)
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('erase', eraseThings)
  socket.on('mouse', mouseMsg)
  socket.on('balls', (data) => {
    console.log(data)
    socket.broadcast.emit('balls', data.splice(0,50))
  })

  function eraseThings(myObjects) {
    console.log("erasing!")
    objects.splice(0, objects.length)
    socket.broadcast.emit('loadPage', objects)
  }

  function mouseMsg(data) {
    console.log(data)
    objects.push(data)
    socket.broadcast.emit('mouse', data)
  }
}
