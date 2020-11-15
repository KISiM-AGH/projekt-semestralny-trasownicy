const {showAll, showByFactory, histogramToday} = require("./controller");
const { Router } = require('express')
const { token } = require('../../services/passport')
const router = new Router()

router.get('/',
    token({ required: true }),
    showAll)

router.get('/:factoryID',
    token({ required: true }),
    showByFactory)

router.get('/daily/:factoryID',
    token({ required: true }),
    byDay)

router.get('/histogram/:factoryID',
    token({ required: true }),
    histogramToday)


module.exports = router
