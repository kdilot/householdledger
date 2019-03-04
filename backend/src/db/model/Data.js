const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const moment = require('moment')
const Schema = mongoose.Schema

connection = mongoose.createConnection(process.env.MLAB_MGDB_URL, { useCreateIndex: true, useNewUrlParser: true })
autoIncrement.initialize(connection)

const DataSchema = new Schema({
    id: { type: Number, ref: 'Data' },
    title: String,
    category: Number,
    type: Boolean,
    price: Number,
    display: Number,
    lastUpdate: Date

})
DataSchema.plugin(autoIncrement.plugin, 'Data')

DataSchema.statics.drop = function () {
    return this.collection.drop()
}

DataSchema.statics.showAll = function (today) {
    const date = moment(today).set('date', 1).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0)
    return this.find({ "display": 1, "lastUpdate": { "$gte": date, "$lt": moment(date).add(1, 'month') } }).sort({ "lastUpdate": 1 })
}

DataSchema.statics.removeData = function (_id) {
    return this.findOneAndUpdate({ _id }, { display: 0, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
}

DataSchema.statics.updateData = function (_id, data) {
    return this.findOneAndUpdate({ _id }, { ...data, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
}

module.exports = mongoose.model('data', DataSchema)