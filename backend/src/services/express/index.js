const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const expressConfig = (apiRoot, routes) => {
  const app = express()

  const corsOptions = {
    origin: 'https://koko-kola.xyz/',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.use(bodyParser.json())
  app.use(apiRoot, routes)

  return app
}

module.exports = expressConfig
