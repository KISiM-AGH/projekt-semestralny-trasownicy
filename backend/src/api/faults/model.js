const mongoose = require('mongoose')

const Schema = mongoose.Schema
const faultSchema = new Schema({
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

faultSchema.methods = {
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

const model = mongoose.model('Fault', faultSchema)

module.exports = {model, faultSchema: faultSchema}

