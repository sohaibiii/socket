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
  $('#myui').append('<p></p>')
})

socket.on('alluserslocation', function (location) {
  var li = $('<li></li>')

  var a = $('<a target="_blank">Current location</a>')
  a.attr('href', location.url)
  li.append(a)
  li.addClass('list-group-item list-group-item-danger')
  $('#myui').append(li)
  $('#myui').append('<p></p>')
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
  $("[type='text']").val('') // for input clear by giving empty string
})

$('.myloc').on('click', function () {
  if (!navigator.geolocation) {
    return alert('your brower dosnt support location')
  } else {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit('gettinglocation', {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
        console.log(position)
      },
      function () {
        return alert('unble to find your location')
      }
    )
  }
})
