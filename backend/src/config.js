const path = require('path')
const merge = require('lodash/merge')

const config = {
    all: {
        env: process.env.NODE_ENV || 'production',
        root: path.join(__dirname, '..'),
        port: 9000,
        ip: 'localhost',
        apiRoot: '/api',
        mongo: {
            options : {
                useCreateIndex: true,        // DeprecationWarning: collection.ensureIndex is deprecated.
                useNewUrlParser: true           // DeprecationWarning: current URL string parser is deprecated
            }
        },

    },
    test: {
        mongo: {
            uri: 'mongodb://localhost/test',
            options: {
                debug: true
            }
        },
        jwtSecret: '4rrfdutpOntGGOVYLdG6hiOQf4v7dY'
    },
    development: {
        mongo: {
            uri: 'mongodb+srv://trasownik:trasownicy69@cluster1.vmliw.mongodb.net/kokokola?retryWrites=true&w=majority',
            options: {
                debug: true
            }
        },
        jwtSecret: '48mXwHcnH8qEwWgzo24y5BEIxgAU0a'
    },
    production: {
        ip: process.env.IP || '54.152.103.77',
        port: process.env.PORT || 8080,
        mongo: {
            uri: 'mongodb+srv://trasownik:trasownicy69@cluster1.vmliw.mongodb.net/kokokola?retryWrites=true&w=majority',
        },
        jwtSecret: '48mXwHcnH8qEwWgzo24y5BEIxgAU0a'
    }
}

module.exports = merge(config.all, config[config.all.env])
