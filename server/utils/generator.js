const moment = require('moment')

const generator = (from, para) => {
  return {
    from,
    para,
    createdAt: moment().format('x')
  }
}

const generatorlocation = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps/?q=${latitude},${longitude}`,
    createdAt: moment().format('x')
  }
}

const stringfy = name => {
  return typeof name === 'string' && name.trim().length > 0
}
module.exports = {
  generator,
  generatorlocation,
  stringfy
}

// function parseParams (str) {
//   var str = str.split('?')[1]
//   return str.split('&').reduce(function (params, param) {
//     console.log(params, '***')
//     console.log(param, '____')
//     var paramSplit = param.split('=').map(function (value) {
//       console.log(value)
//       return decodeURIComponent(value.replace(/\+/g, ' '))
//     })
//     console.log(paramSplit)
//     params[paramSplit[0]] = paramSplit[1]
//     return params
//   }, {})
// }

// parseParams('?name=sohaib&room=agri')
