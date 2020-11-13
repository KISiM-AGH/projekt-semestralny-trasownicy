const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const expressConfig = (apiRoot, routes) => {
  const app = express()

  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json())
  app.use(apiRoot, routes)

  return app
}

module.exports = expressConfig
