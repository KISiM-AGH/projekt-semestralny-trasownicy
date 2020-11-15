const {showAll, showByFactory, histogramToday, byHour, byDay} = require("./controller");
const { Router } = require('express')
const { token } = require('../../services/passport')
const router = new Router()

router.get('/',
    token({ required: true }),
    showAll)

router.get('/:factoryID',
    token({ required: true }),
    showByFactory)

router.get('/hourly/:factoryID',
    token({ required: true }),
    byHour)

router.get('/daily/:factoryID',
    token({ required: true }),
    byDay)

router.get('/histogram/:factoryID',
    token({ required: true }),
    histogramToday)


module.exports = router
