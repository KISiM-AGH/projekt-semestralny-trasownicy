const https = require('https')
const { env, port, ip, apiRoot, mongo } = require('./config')
const express = require('./services/express')
const api = require('./api')
const fs = require('fs')

const mongoose = require('./services/mongoose')

const app = express(apiRoot, api)
const server = https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
    },app)
mongoose.connect(mongo.uri)

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on https://%s:%d, in %s mode', ip, port, env)
  })
})


module.exports = app
