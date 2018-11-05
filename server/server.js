const express = require('express')
const path = require('path')
var port = process.env.PORT || 3000

const app = express()

var ad = path.join(__dirname, '../app')

app.use(express.static(ad))

app.listen(port, () => {
  console.log(`the port is started at ${port} `)
})
