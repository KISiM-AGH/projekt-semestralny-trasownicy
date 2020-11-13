const {showAll, showByFactory, showByMachine} = require("./controller");
const { Router } = require('express')
const { token } = require('../../services/passport')
const router = new Router()

router.get('/',
    token({ required: true }),
    showAll)

router.get('/:factoryID',
    token({ required: true }),
    showByFactory)

router.get('/:factoryID/:machineID',
    token({ required: true }),
    showByMachine)

//router.get('/:id',
//  show)

module.exports = router
