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

DataSchema.statics.showAll = function (today, year = false) {
    if (!year) {
        const date = moment(today).startOf('month')
        return this.find({ "display": 1, "lastUpdate": { "$gte": date, "$lt": moment(date).add(1, 'month') } }).sort({ "lastUpdate": 1 })
    } else {
        const date = moment(today).startOf('year')
        return this.find({ "display": 1, "lastUpdate": { "$gte": date, "$lt": moment(date).add(1, 'year') } }, { "type": 1, "price": 1, "category": 1, "lastUpdate": 1 }).sort({ "lastUpdate": 1 })
    }
}

DataSchema.statics.removeData = function (_id) {
    return this.findOneAndUpdate({ _id }, { display: 0, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
}

DataSchema.statics.editData = function (_id, data) {
    return this.findOneAndUpdate({ _id }, { ...data }, { upsert: false, new: true }).exec()
}

module.exports = mongoose.model('data', DataSchema)