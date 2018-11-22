var socket = io()

socket.on('connect', function () {
  console.log('server is connected from client')

  socket.emit('Userdata', parseParams(window.location.search), function (err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('everything is fine')
    }
  })
})
socket.on('updateuserlist', function (list) {
  console.log(list)
  var ul = $('<ul></ul>')
  ul.addClass('list-group col-sm-10  ml-4 mr-4')
  list.forEach(function (element) {
    ul.append(
      $(`<li>${element}</li>`).addClass(
        'list-group-item list-group-item-secondary'
      )
    )
    ul.append('<p></p>')
  })
  $('#users').html(ul)
})

socket.on('allusers', function (data) {
  console.log(data)
  var timeof = moment(data.craetedAt).format('h:mm:ss a')
  var li = $('<li></li>')
  var h4 = $('<h4></h4>').text(`${data.from}`)
  li.append(h4)
  var p = $('<p></p>').text(`${data.para}`)
  li.append(p)
  var a = $('<em></em>').text(` ${timeof}`)
  li.append(a)

  li.addClass('list-group-item list-group-item-success')
  $('#myui').append(li)
  $('#myui').append('<p></p>')
})

socket.on('alluserslocation', function (location) {
  var timeof = moment(location.craetedAt).format('h:mm:ss a')
  var li = $('<li></li>')

  var a = $(
    `<a target="_blank">Current location of ${location.from} at  ${timeof}</a>`
  )
  a.attr('href', location.url)
  li.append(a)
  li.addClass('list-group-item list-group-item-danger')
  $('#myui').append(li)
  $('#myui').append('<p></p>')
})

function parseParams (str) {
  var str = str.split('?')[1]
  return str.split('&').reduce(function (params, param) {
    var paramSplit = param.split('=').map(function (value) {
      return decodeURIComponent(value.replace(/\+/g, ' '))
    })
    params[paramSplit[0]] = paramSplit[1]
    return params
  }, {})
}

$('#myform').on('submit', function (e) {
  e.preventDefault()

  socket.emit(
    'newMessage',
    {
      // yaha hum event ko fire krty hai in emit

      para: $("[type='text']").val()
    },
    function (details) {
      console.log(details)
    }
  )
  $("[type='text']").val('') // for input clear by giving empty string
})
var buton = $('.myloc')
buton.on('click', function () {
  buton.attr('disabled', 'disabled').text('location loading...')
  if (!navigator.geolocation) {
    return alert('your brower dosnt support location')
  } else {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit('gettinglocation', {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
        buton.removeAttr('disabled').text('add location')
      },
      function () {
        buton.removeAttr('disabled').text('add location')
        return alert('unble to find your location')
      }
    )
  }
})

socket.on('disconnect', function () {
  console.log('when client is disconnected with server')
})
