const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

connection = mongoose.createConnection(process.env.MLAB_MGDB_URL, { useCreateIndex: true, useNewUrlParser: true })
autoIncrement.initialize(connection)

const DataSchema = new Schema({
    id: { type: Number, ref: 'Data' },
    title: String,
    description: String,
    category: Number,
    price: Number,
    display: Number,
    lastUpdate: Date

})
DataSchema.plugin(autoIncrement.plugin, 'Data')

DataSchema.statics.drop = function () {
    return this.collection.drop()
}

DataSchema.statics.showAll = function (cb) {
    return this.find({}, cb)
}

DataSchema.statics.updateData = function (_id, data) {
    return this.findOneAndUpdate({ _id }, { ...data, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
}

module.exports = mongoose.model('data', DataSchema)

// CurrencyRateSchema.statics.updateTicker = function (name, data) {
//   return this.findOneAndUpdate({ name }, { ...data, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
// }
