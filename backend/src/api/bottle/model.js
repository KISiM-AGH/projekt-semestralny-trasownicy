const mongoose = require('mongoose')

const Schema = mongoose.Schema
const bottleSchema = new Schema({
    id: {
        type: String,
        index: {unique: true}
    },
    FactoryID: {
        type: String,
        index: {unique: true}
    },
    MachineID: {
        type: String
    },
    Power: {
        type: Number
    },
    Date_and_Time: {
        type: Date
    },
    Value: {
        type: Number
    },
})

bottleSchema.methods = {
    view() {
        return {
            id: this._id,
            FactoryID: this.FactoryID,
            MachineID: this.MachineID,
            Power: this.Power,
            Date_and_Time: this.Date_and_Time,
            Value: this.Value,
        }
    }
}

const model = mongoose.model('Bottle', bottleSchema)

module.exports = {model, bottleSchema: bottleSchema}

