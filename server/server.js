const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const { generator } = require('./utils/generator')
var port = process.env.PORT || 3000

const app = express()

var ad = path.join(__dirname, '../app')
var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(ad))

io.on('connection', socket => {
  console.log('user started server from server side')

  socket.on('disconnect', () => {
    console.log('user is disconnected from server')
  })

  socket.on('newMessage', (msg, callback) => {
    // yaha hum event ko listen krty hai jo fire hta hai
    console.log(msg)
    callback('we got values')
    io.emit('allusers', {
      // it will fire event to all users
      from: msg.from,
      para: msg.para
    })

    // socket.broadcast.emit('allusers', {
    //   // it will fire event to all users except the user wo fire this
    //   from: msg.from,
    //   para: msg.para
    // })
  })

  socket.emit('allusers', generator('admin', 'Welcome new user'))
  socket.broadcast.emit('allusers', generator('admin', 'New users joind'))
})

server.listen(port, () => {
  console.log(`the port is started at ${port} `)
})
