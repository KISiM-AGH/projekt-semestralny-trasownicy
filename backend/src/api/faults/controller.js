const { success } = require('../../services/response')
const Fault = require('./model').model
const today = require('./helpers').today

const showAll = ({params}, res, next) =>
    Fault.find({}, {})
        .then((faults) => faults.map((faults) => faults.view()))
        .then(success(res))
        .catch(next)

const showByFactory = ({params}, res, next) =>
    Fault.find({FactoryID: params.factoryID}, {})
        .then((faults) => faults.map((faults) => faults.view()))
        .then(success(res))
        .catch(next)


const histogramToday = ({params}, res, next) => {
    const pipeline = [
        {
            '$match': {
                'FactoryID': params.factoryID
            }
        }, {
            '$project': {
                'daySubstring': {
                    '$substrBytes': [
                        '$Date_and_Time', 0, 11
                    ]
                },
                'hourSubstring': {
                    '$substrBytes': [
                        '$Date_and_Time', 12, 2
                    ]
                },
                'MachineID': 1,
                'Power': 1,
                'Value': 1
            }
        }, {
            '$match': {
                'daySubstring': today
            }
        }, {
            '$group': {
                '_id': '$hourSubstring',
                'y': {
                    '$sum': '$Value'
                }
            }
        }, {
            '$project': {
                'label': '$_id',
                '_id': 0,
                'y': 1
            }
        }, {
            '$sort': {
                'label': 1
            }
        }
    ];
    return Fault.aggregate(pipeline)
        .then(success(res))
        .catch(next);
}


const byHour = ({params}, res, next) => {
    const pipeline = [
        {
            '$match': {
                'FactoryID': params.factoryID
            }
        }, {
            '$project': {
                'hourSubstring': {
                    '$substrBytes': [
                        '$Date_and_Time', 12, 2
                    ]
                },
                'dateSubstring': {
                    '$substrBytes': [
                        '$Date_and_Time', 0, 11
                    ]
                },
                'Value': 1
            }
        }, {
            '$project': {
                'date': {
                    '$concat': [
                        '$dateSubstring', ' ', '$hourSubstring', ':00'
                    ]
                },
                'Value': 1
            }
        }, {
            '$group': {
                '_id': '$date',
                'y': {
                    '$sum': '$Value'
                }
            }
        }, {
            '$project': {
                'date': '$_id',
                '_id': 0,
                'y': 1
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ];
    return Fault.aggregate(pipeline)
        .then(success(res))
        .catch(next);
}

const byDay = ({params}, res, next) => {
    const pipeline = [
        {
            '$match': {
                'FactoryID': params.factoryID
            }
        }, {
            '$project': {
                'date': {
                    '$substrBytes': [
                        '$Date_and_Time', 0, 11
                    ]
                },
                'Value': 1
            }
        }, {
            '$group': {
                '_id': '$date',
                'y': {
                    '$sum': '$Value'
                }
            }
        }, {
            '$project': {
                'date': '$_id',
                '_id': 0,
                'y': 1
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ];
    return Fault.aggregate(pipeline)
        .then(success(res))
        .catch(next);
}


const sum = ({params}, res, next) => {
    const pipeline = [
        {
            '$match': {
                'FactoryID': params.factoryID
            }
        }, {
            '$group': {
                '_id': '$FactoryID',
                'total': {
                    '$sum': '$Value'
                }
            }
        }, {
            '$project': {
                '_id': 0
            }
        }
    ];
    return Fault.aggregate(pipeline)
        .then(success(res))
        .catch(next);
}


module.exports = {
    showAll, showByFactory, histogramToday, byDay, byHour, sum
}
