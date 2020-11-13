const req = require("express");
const {showAll, showByFactory, showByMachine, histogramToday} = require("./controller");
const { Router } = require('express')
const { token } = require('../../services/passport')
const router = new Router()

router.get('/',
    token({ required: true }),
    showAll)

router.get('/:factoryID',
    token({ required: true }),
    showByFactory)

router.get('/histogram/:factoryID',
    token({ required: true }),
    histogramToday)


module.exports = router
