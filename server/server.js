const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')
const { generator, generatorlocation, stringfy } = require('./utils/generator')
var { User } = require('./utils/users')
var port = process.env.PORT || 3000

const app = express()
var user = new User()

var ad = path.join(__dirname, '../app')
var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(ad))

io.on('connection', socket => {
  console.log('user started server from server side')

  socket.on('Userdata', (params, callback) => {
    if (!stringfy(params.username) || !stringfy(params.room)) {
      return callback('username and room must be filled')
    }
    socket.join(params.room) // to create a room in socket
    user.removeuser(socket.id)
    user.adduser(socket.id, params.username, params.room) // jb b koi user connect hta hai to socket ose id deta hai unique si
    io.to(params.room).emit('updateuserlist', user.getuserslist(params.room))
    callback()

    socket.emit('allusers', generator('admin', 'Welcome new user'))
    socket.broadcast
      .to(params.room)
      .emit('allusers', generator('admin', `${params.username} has joined `))
  })

  socket.on('newMessage', (msg, callback) => {
    // yaha hum event ko listen krty hai jo fire hta hai
    console.log(msg)
    callback('we got values')
    var u = user.getuser(socket.id)
    if (u && stringfy(msg.para)) {
      io.to(u.room).emit('allusers', generator(u.name, msg.para))
    }

    // socket.broadcast.emit('allusers', {
    //   // it will fire event to all users except the user wo fire this
    //   from: msg.from,
    //   para: msg.para
    // })
  })
  socket.on('gettinglocation', loc => {
    var u = user.getuser(socket.id)
    if (u) {
      io
        .to(u.room)
        .emit(
          'alluserslocation',
          generatorlocation(`${u.name}`, loc.latitude, loc.longitude)
        )
    }
  })

  socket.on('disconnect', function () {
    console.log('user is disconnected from server')

    var res = user.removeuser(socket.id)

    if (res) {
      io.to(res.room).emit('updateuserlist', user.getuserslist(res.room))
      io
        .to(res.room)
        .emit('allusers', generator('admin', `${res.name} has left`))
    }
  })
})

server.listen(port, () => {
  console.log(`the port is started at ${port} `)
})
