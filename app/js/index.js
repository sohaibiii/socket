var socket = io()
socket.on('connect', function () {
  console.log('server is connected from client')
})
socket.on('disconnect', function () {
  console.log('when client is disconnected with server')
})

socket.on('allusers', function (data) {
  var li = $('<li></li>')
  li.text(`${data.para}`)
  li.addClass('list-group-item list-group-item-success')
  $('#myui').append(li)
})

$('#myform').on('submit', function (e) {
  e.preventDefault()
  socket.emit(
    'newMessage',
    {
      // yaha hum event ko fire krty hai in emit
      from: 'User',
      para: $("[type='text']").val()
    },
    function (details) {
      console.log(details)
    }
  )
})
