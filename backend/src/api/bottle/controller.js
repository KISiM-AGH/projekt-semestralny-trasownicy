const { success } = require('../../services/response')
const Bottle = require('./model').model

const showAll = ({params}, res, next) =>
    Bottle.find({}, {})
        .then((bottles) => bottles.map((bottles) => bottles.view()))
        .then(success(res))
        .catch(next)

const showByFactory = ({params}, res, next) =>
    Bottle.find({FactoryID: params.factoryID}, {})
        .then((bottles) => bottles.map((bottles) => bottles.view()))
        .then(success(res))
        .catch(next)

const showByMachine = ({params}, res, next) =>
    Bottle.find({FactoryID: params.factoryID, MachineID: params.machineID}, {})
        .then((bottles) => bottles.map((bottles) => bottles.view()))
        .then(success(res))
        .catch(next)

module.exports = {
    showAll, showByFactory, showByMachine
}
