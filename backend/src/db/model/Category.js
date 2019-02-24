const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

connection = mongoose.createConnection(process.env.MLAB_MGDB_URL, { useCreateIndex: true, useNewUrlParser: true })
autoIncrement.initialize(connection)

const CategorySchema = new Schema({
    id: { type: Number, ref: 'Category' },
    title: String,
    display: Number,
    lastUpdate: Date

})
CategorySchema.plugin(autoIncrement.plugin, 'Category')

CategorySchema.statics.drop = function () {
    return this.collection.drop()
}

CategorySchema.statics.showAll = function (cb) {
    return this.find({ display: 1 }, cb)
}

CategorySchema.statics.removeCategory = function (_id) {
    return this.findOneAndUpdate({ _id }, { display: 0, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
}

CategorySchema.statics.editCategory = function (_id, title) {
    return this.findOneAndUpdate({ _id }, { title, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
}

module.exports = mongoose.model('category', CategorySchema)