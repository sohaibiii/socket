var socket = io()
socket.on('connect', function () {
  console.log('server is connected from client')

  // socket.emit('newMessage', {
  //   // yaha hum event ko fire krty hai in emit
  //   from: 'sohaib ali',
  //   para: 'hey bro how are u'
  // })
})
socket.on('disconnect', function () {
  console.log('when client is disconnected with server')
})

socket.on('createMessage', function (mesg) {
  console.log(mesg)
})

socket.on('allusers', function (data) {
  console.log(data)
})
